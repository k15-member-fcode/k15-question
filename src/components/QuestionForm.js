import React, { useRef, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/database";
import { Form, Radio, Input, Button, Icon } from "antd";
import logo from "../utils/logo.jpg";
import { firebaseConfig } from "../utils/configFirebase";
import { createNotification } from "./Common/Notification";
import { toTitleCase, studentIdValidation, nameValidation } from "../utils/config";

firebase.initializeApp({
  apiKey: firebaseConfig.apiKey,
  authDomain: firebaseConfig.authDomain,
  databaseURL: firebaseConfig.databaseURL,
  projectId: firebaseConfig.projectId,
  storageBucket: firebaseConfig.storageBucket,
  messagingSenderId: firebaseConfig.messagingSenderId
});

const dataQuestion = firebase.database();
const majorList = ["SE", "IA", "IoT", "AI"];

const processData = submitData => {
  const fullname = submitData.fullname === undefined ? "No Name" : toTitleCase(submitData.fullname);
  const studentID = "SE" + submitData.studentID;
  const question = " - " + submitData.question;
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
  };
};

const writeQuestionToFirebase = (data, language) => {
  const setName = toTitleCase(data.fullname);
  const setStudentID = data.studentID;
  const setQuestion = data.question;
  const setMajor = data.major;
  const setDate = data.date;

  let ref = dataQuestion.ref("k15-questions");
  let userRef = ref.child(setStudentID);
  let cUserRef = ref.child("totalOfUser");
  let cQuesRef = ref.child("totalOfQuestion");
  userRef.once("value", data => {
    let curUserRef = ref.child(setStudentID);
    if (data.val() != null) {
      let totalTimes = data.val().totalTimes + 1;
      let question = data.val().question + "; " + totalTimes + setQuestion;
      curUserRef.update({
        question: question,
        timeUpdate: setDate,
        totalTimes: totalTimes
      });
      createNotification(language.notiUpdate, 0);
    } else {
      curUserRef.set({
        id: setStudentID,
        name: setName,
        major: setMajor,
        question: "1" + setQuestion,
        timeCreate: setDate,
        timeUpdate: setDate,
        totalTimes: 1
      });
      createNotification(language.notiCreate, 0);
      cUserRef.once("value", data => {
        let totalOfUser = data.val();
        ref.update({
          totalOfUser: ++totalOfUser
        });
      });
      let totalMajorName = "totalOf" + setMajor;
      ref.child(totalMajorName).once("value", data => {
        let totalMajor = {};
        totalMajor[totalMajorName] = data.val() + 1;
        ref.update(totalMajor);
      });
    }
    cQuesRef.once("value", data => {
      let totalOfQuestion = data.val();
      ref.update({
        totalOfQuestion: ++totalOfQuestion
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

const QuestionForm = (props) => {
  let language = props.language;
  const isError = useRef(false);
  const isSubmit = useRef(false);
  const isFirstRun = useRef(true);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    } else {
      if (isError.current) {
        document.getElementsByTagName("button")[0].click();
      }
    }
  }, [language]);

  const { getFieldDecorator } = props.form;
  const handleSubmit = event => {
    event.preventDefault();
    isSubmit.current = true;
    props.form.validateFields({ force: true }, (err, values) => {
      if (!err) {
        isError.current = false;
        const processedData = processData(values);
        writeQuestionToFirebase(processedData, language);
      } else {
        isError.current = true;
      }
    });
  };

  const handleStudentId = (rule, value, callback) => {
    let studentID = value;
    if (isSubmit.current) {
      if (!studentIdValidation.test(studentID) || studentID.length !== 6) {
        if (studentID !== undefined) {
          studentID.length !== 0
            ? callback(language.formList[1].errMessage[1])
            : callback();
        }
      }
    }
    callback();
  };

  return (
    <Form {...formItemLayout} onSubmit={handleSubmit} className="Form">
      <Form.Item {...tailFormItemLayout}>
        <div className="formHeader">
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
        </div>
      </Form.Item>
      <Form.Item label={language.formList[0].label}>
        {getFieldDecorator("fullname", {
          rules: [
            {
              pattern: nameValidation,
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
            prefix="SE"
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
            {majorList.map((major, index) => {
              return (
                <Radio.Button key={index} value={major}>
                  {major}
                </Radio.Button>
              );
            })}
          </Radio.Group>
        )}
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          {language.submitBtn}
        </Button>
      </Form.Item>
    </Form>
  );
}

export default Form.create()(QuestionForm);
