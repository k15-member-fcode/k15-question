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

const writeQuestionToFirebase = (submitData, language) => {
  var setName = toTitleCase(submitData.fullname);
  var setStudentID = submitData.studentID.toUpperCase();
  var setQuestion = submitData.question;
  var setMajor = submitData.major;
  var setDate = new Date();
  var date = String(setDate.getDate()).padStart(2, "0");
  var mon = String(setDate.getMonth() + 1).padStart(2, "0"); //January is 0!
  var year = setDate.getFullYear();
  var hours = String(setDate.getHours()).padStart(2, "0");
  var min = String(setDate.getMinutes()).padStart(2, "0");
  setDate = hours + ":" + min + " - " + date + "/" + mon + "/" + year;
  var ref = dataQuestion.ref("k15-questions");
  var userRef = ref.child(setStudentID);
  var cUserRef = ref.child("countUser");
  var cQuesRef = ref.child("countQuestion");
  userRef.once("value", data => {
    var curUserRef = ref.child(setStudentID);
    if (data.val() != null) {
      var totalTimes = data.val().totalTimes + 1;
      curUserRef.update({
        timeUpdate: setDate,
        totalTimes: totalTimes
      });
      var newQuestion = {};
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
        var count = data.val() + 1;
        ref.update({
          countUser: count
        });
      });
    }
    cQuesRef.once("value", data => {
      var count = data.val() + 1;
      ref.update({
        countQuestion: count
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
    const isFirstRun = useRef(true);
    const isFirstSubmit = useRef(true);
    useEffect(() => {
      if (isFirstRun.current) {
        isFirstRun.current = false;
        return;
      }
      else {
        setLanguage(language => props.language);
      }
    });
    useEffect(() => {
      if (isFirstSubmit.current) {
        isFirstSubmit.current = false;
        return;
      }
      else {
        isError.current = false;
        document.getElementsByTagName("button")[0].click();
      }
    }, [isError.current && language]);

    const { getFieldDecorator } = props.form;
    const handleSubmit = (event) => {
      event.preventDefault();
      props.form.validateFields({ force: true }, (err, values) => {
        if (!err) {
          writeQuestionToFirebase(values, language);
        }
        else {
          isError.current = true;
        }
      });
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
                  max: 8,
                  pattern: "[A-Za-z]{2}(0[1-9]|1[0-5])[0-1]{1}[0-9]{3}",
                  message: language.formList[1].errMessage[1]
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
