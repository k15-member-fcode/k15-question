import React from "react";
import firebase from "firebase";
import { Form, Radio, Input, Button, Icon, notification } from "antd";
import "./QuestionForm.css";
import logo from "../logo.jpg";

var firebaseConfig = {
  apiKey: "AIzaSyDR-M4_CZBkzW6v160ytZn5G5AGbPh_TB0",
  authDomain: "fcode-fpthcm-k15-question.firebaseapp.com",
  databaseURL: "https://fcode-fpthcm-k15-question.firebaseio.com",
  projectId: "fcode-fpthcm-k15-question",
  storageBucket: "",
  messagingSenderId: "132470499365",
  appId: "1:132470499365:web:e7405c7866374298"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var dataQuestion = firebase.database();

function toTitleCase(str) {
     return str.replace(
         /\w\S*/g,
         function(txt) {
             return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
         }
     );
 }

class QuestionForm extends React.Component {
  notificationCreate = () => {
    notification.open({
      message: this.props.notiCreate.title,
      description: this.props.notiCreate.content,
      icon: <Icon type="check-circle" style={{ color: "#5cb85c" }} />,
      duration: 0
    });
  };

  notificationUpdate = () => {
    notification.open({
      message: this.props.notiUpdate.title,
      description: this.props.notiUpdate.content,
      icon: <Icon type="check-circle" style={{ color: "#5cb85c" }} />,
      duration: 0
    });
  };

  saveQuestion = values => {
    var getName = toTitleCase(values.fullname);
    var getStudentID = values.studentID.toUpperCase();
    var getQuestion = values.question;
    var getMajor = values.major;
    var getDate = new Date();
    var date = String(getDate.getDate()).padStart(2, "0");
    var mon = String(getDate.getMonth() + 1).padStart(2, "0"); //January is 0!
    var year = getDate.getFullYear();
    var hours = String(getDate.getHours()).padStart(2, "0");
    var min = String(getDate.getMinutes()).padStart(2, "0");
    getDate = hours + ":" + min + " - " + date + "/" + mon + "/" + year;

    var quesRef = dataQuestion.ref(getStudentID);
    quesRef.once("value", data => {
      console.log("Data: ", data.val());
      var newQuesRef = dataQuestion.ref(getStudentID);
      if (data.val() != null) {
        getQuestion = data.val().question + "; " + getQuestion;
        newQuesRef.update({
          question: getQuestion,
          updatedAt: getDate
        });
        console.log(getQuestion);
        console.log("Flag in: exist");
        this.notificationUpdate();
      } else {
        newQuesRef.set({
          name: getName,
          studentID: getStudentID,
          question: getQuestion,
          major: getMajor,
          createdAt: getDate,
          updatedAt: getDate
        });
        console.log("Flag in: not exist");
        this.notificationCreate();
      }
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ");
        console.log("Name: ", values.fullname);
        console.log("Student ID: ", values.studentID);
        console.log("Question: ", values.question);
        console.log("Major: ", values.major);
        this.saveQuestion(values);
      }
    });
  };

  render() {
    const { TextArea } = Input;
    const { getFieldDecorator } = this.props.form;
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
    return (
      <div className="Form">
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item {...tailFormItemLayout}>
            <img alt="logo-fcode" className="logo" src={logo} />
            <div className="titleText">
              <h1>{this.props.titleForm}</h1>
              <ul className="formNotes">
                {this.props.titleNote}
                <li>
                  <Icon type="check" /> {this.props.noteList[0]}{" "}
                </li>
                <li>
                  <Icon type="check" /> {this.props.noteList[1]}{" "}
                </li>
                <li>
                  <Icon type="check" /> {this.props.noteList[2]}{" "}
                </li>
                <li>
                  <Icon type="check" /> {this.props.noteList[3]}{" "}
                </li>
              </ul>
            </div>
          </Form.Item>
          <Form.Item label={this.props.formList[0].label}>
            {getFieldDecorator("fullname", {
              rules: [
                { required: true, message: this.props.formList[0].errMessage[0] },
                { pattern: "[A-Za-z]", message: this.props.formList[0].errMessage[1]}
              ]
            })(
              <Input
                size="large"
                placeholder={this.props.formList[0].placeholder}
                autoComplete="off"
              />
            )}
          </Form.Item>
          <Form.Item label={this.props.formList[1].label}>
            {getFieldDecorator("studentID", {
              rules: [
                { required: true, message: this.props.formList[1].errMessage[0] },
                { pattern: "[A-Za-z]{2}(0[1-9]|1[0-5])[0-1]{1}[0-9]{3}", message: this.props.formList[1].errMessage[1]}
              ]
            })(
              <Input
                size="large"
                placeholder={this.props.formList[1].placeholder}
                autoComplete="off"
              />
            )}
          </Form.Item>
          <Form.Item label={this.props.formList[2].label}>
            {getFieldDecorator("question", {
              rules: [
                { required: true, message: this.props.formList[2].errMessage }
              ]
            })(<TextArea rows={4} />)}
          </Form.Item>
          <Form.Item label={this.props.formList[3].label}>
            {getFieldDecorator("major", {
              rules: [
                { required: true, message: this.props.formList[3].errMessage }
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
            <Button
              type="primary"
              htmlType="submit"
              onClick={this.sendQuestion}
            >
              {this.props.submitBtn}
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
export default Form.create()(QuestionForm);
