import React, { useState, useRef, useEffect } from "react";
import firebase from "firebase";
import { Form, Radio, Input, Button, Icon } from "antd";
import logo from "../utils/logo.jpg";
import { firebaseConfig } from "../utils/configFirebase";
import { createNotification } from "./Common/Notification";

firebase.initializeApp(firebaseConfig);
const dataQuestion = firebase.database();

const toTitleCase = (str) => {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

const processData = (submitData) => {
  const fullname = toTitleCase(submitData.fullname);
  const studentID = submitData.studentID.toUpperCase();
  const question = submitData.question;
  const major = submitData.major;
  let date = new Date();
  const day = String(date.getDate()).padStart(2, "0");
  const mon = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const min = String(date.getMinutes()).padStart(2, "0");
  date = hours + ":" + min + " - " + day + "/" + mon + "/" + year;
  return {
    fullname,
    studentID,
    question,
    major,
    date
  }
}
const writeQuestionToFirebase = (data, language) => {
  const setName = toTitleCase(data.fullname);
  const setStudentID = data.studentID;
  const setQuestion = data.question;
  const setMajor = data.major;
  const setDate = data.date;

  let ref = dataQuestion.ref("k15-questions");
  let userRef = ref.child(setStudentID);
  let cUserRef = ref.child("countUser");
  let cQuesRef = ref.child("countQuestion");
  userRef.once("value", data => {
    let curUserRef = ref.child(setStudentID);
    if (data.val() != null) {
      let totalTimes = data.val().totalTimes + 1;
      curUserRef.update({
        timeUpdate: setDate,
        totalTimes: totalTimes
      });
      let newQuestion = {};
      newQuestion[totalTimes] = setQuestion;
      curUserRef.child("question").update(newQuestion);
      createNotification(language.notiUpdate, 0);
    } else {
      curUserRef.set({
        id: setStudentID,
        name: setName,
        major: setMajor,
        question: { 1: setQuestion },
        timeCreate: setDate,
        timeUpdate: setDate,
        totalTimes: 1
      });
      createNotification(language.notiCreate, 0);
      cUserRef.once("value", data => {
        let totalOfUser = data.val();
        ref.update({
          countUser: ++totalOfUser
        });
      });
    }
    cQuesRef.once("value", data => {
      let totalOfQuestion = data.val();
      ref.update({
        countQuestion: ++totalOfQuestion
      });
    });
  });
};

const { TextArea } = Input;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 }
  }
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0
    },
    sm: {
      span: 16,
      offset: 8
    }
  }
};

function QuestionForm(props) {
    const [language, setLanguage] = useState(props.language);
    const isError = useRef(false);
    const isSubmit = useRef(false);
    const isFirstRun = useRef(true);
    useEffect(() => {
      if (isFirstRun.current) {
        isFirstRun.current = false;
        return;
      }
      else {
          if (language !== props.language) {
              setLanguage(language => props.language);
              console.log("changed");
              if (isError.current) {
                document.getElementsByTagName("button")[0].click();
              }
          }
        }
    }, [props]);
    const { getFieldDecorator } = props.form;
    const handleSubmit = (event) => {
      event.preventDefault();
      isSubmit.current = true;
      props.form.validateFields({ force: true }, (err, values) => {
        if (!err) {
          isError.current = false;
          const processedData = processData(values);
          writeQuestionToFirebase(processedData, language);
        }
        else {
          isError.current = true;
        }
      });
    };
    const handleStudentId = (rule, value, callback) => {
      let studentID = value;
      if (isSubmit.current) {
        if ((!/^[A-Za-z]{2}(0[1-9]|1[0-5])[0-1]{1}[0-9]{3}$/.test(studentID) || studentID.length !== 8)) {
          if (studentID !== undefined){
            if (studentID.length !== 0) {
              callback(language.formList[1].errMessage[1])
            }
            else {
              callback();
            }
          }
        }
        else {
          isSubmit.current = false;
        }
      }
      callback();
    };
    return (
      <div className="Form">
        <Form {...formItemLayout} onSubmit={handleSubmit}>
          <Form.Item {...tailFormItemLayout}>
            <img alt="logo-fcode" className="logo" src={logo} />
            <div className="titleText">
              <h1>{language.titleForm}</h1>
              <ul className="formNotes">
                {language.titleNote}
                {language.noteList.map(note => {
                  return (
                    <li key={note.id}>
                    <Icon type="check" /> {note.content}{" "}
                  </li>
                  );
                })}
              </ul>
            </div>
          </Form.Item>
          <Form.Item label={language.formList[0].label}>
            {getFieldDecorator("fullname", {
              rules: [
                {
                  required: true,
                  message: language.formList[0].errMessage[0]
                },
                {
                  pattern: "[A-Za-z]",
                  message: language.formList[0].errMessage[1]
                }
              ]
            })(
              <Input
                size="large"
                placeholder={language.formList[0].placeholder}
                autoComplete="off"
              />
            )}
          </Form.Item>
          <Form.Item label={language.formList[1].label}>
            {getFieldDecorator("studentID", {
              rules: [
                {
                  required: true,
                  message: language.formList[1].errMessage[0]
                },
                {
                  validator: handleStudentId
                }
              ]
            })(
              <Input
                size="large"
                placeholder={language.formList[1].placeholder}
                autoComplete="off"
              />
            )}
          </Form.Item>
          <Form.Item label={language.formList[2].label}>
            {getFieldDecorator("question", {
              rules: [
                {
                  required: true,
                  message: language.formList[2].errMessage
                }
              ]
            })(<TextArea rows={4} />)}
          </Form.Item>
          <Form.Item label={language.formList[3].label}>
            {getFieldDecorator("major", {
              rules: [
                {
                  required: true,
                  message: language.formList[3].errMessage
                }
              ],
              initialValue: "SE"
            })(
              <Radio.Group buttonStyle="outline">
                <Radio.Button value="SE" defaultChecked>
                  SE
                </Radio.Button>
                <Radio.Button value="IA">IA</Radio.Button>
                <Radio.Button value="IoT">IoT</Radio.Button>
                <Radio.Button value="AI">AI</Radio.Button>
              </Radio.Group>
            )}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              {language.submitBtn}
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }

export default Form.create()(QuestionForm);
