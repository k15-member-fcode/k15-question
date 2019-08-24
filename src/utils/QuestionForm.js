import React from "react";
import firebase from "firebase";
import { Form, Radio, Input, Button, Icon, notification } from "antd";
import "./QuestionForm.css";
import logo from "../logo.jpg";

// Setup Firebase information
var firebaseConfig = {
  apiKey: "AIzaSyDR-M4_CZBkzW6v160ytZn5G5AGbPh_TB0",
  authDomain: "fcode-fpthcm-k15-question.firebaseapp.com",
  databaseURL: "https://fcode-fpthcm-k15-question.firebaseio.com",
  projectId: "fcode-fpthcm-k15-question",
  storageBucket: "",
  messagingSenderId: "132470499365",
  appId: "1:132470499365:web:e7405c7866374298"
};
// Initialize starting language
var oldLang = "en";
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize realtime database
var dataQuestion = firebase.database();
// Get string to title style like "This Is Title Style"
function toTitleCase(str) {
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

// Class QuestionForm
class QuestionForm extends React.Component {
// Notification for creating a new user
  notificationCreate = () => {
    notification.open({
      message: this.props.language.notiCreate.title,
      description: this.props.language.notiCreate.content,
      icon: <Icon type="check-circle" style={{ color: "#5cb85c" }} />,
      duration: 0
    });
  };
// Notification for updating a new question
  notificationUpdate = () => {
    notification.open({
      message: this.props.language.notiUpdate.title,
      description: this.props.language.notiUpdate.content,
      icon: <Icon type="check-circle" style={{ color: "#5cb85c" }} />,
      duration: 0
    });
  };
//  Save question to database
  saveQuestion = values => {
//  Get values from form
    var setName = toTitleCase(values.fullname);
    var setStudentID = values.studentID.toUpperCase();
    var setQuestion = values.question;
    var setMajor = values.major;
    var setDate = new Date();
    var date = String(setDate.getDate()).padStart(2, "0");
    var mon = String(setDate.getMonth() + 1).padStart(2, "0"); //January is 0!
    var year = setDate.getFullYear();
    var hours = String(setDate.getHours()).padStart(2, "0");
    var min = String(setDate.getMinutes()).padStart(2, "0");
    setDate = hours + ":" + min + " - " + date + "/" + mon + "/" + year;
//  k15-question is the main node
    var ref = dataQuestion.ref("k15-questions");
//  Set studentID
    var userRef = ref.child(setStudentID);
//  Set user counter
    var cUserRef = ref.child("countUser");
//  Set question counter
    var cQuesRef = ref.child("countQuestion");
//  Get value based on studentID once
    userRef.once("value", data => {
//    Get current user
      var curUserRef = ref.child(setStudentID);
//    Check if current user is old
      if (data.val() != null) {
//      Counter question of a user
        var totalTimes = data.val().totalTimes + 1;
//      Update time and counter
        curUserRef.update({
          timeUpdate: setDate,
          totalTimes: totalTimes
        });
//      Initialize new question format
        var newQuestion = {};
        newQuestion[totalTimes] = setQuestion;
//      Update question
        curUserRef.child("question").update(newQuestion);
        this.notificationUpdate();
      } else {
//      Create a new user
        curUserRef.set({
          id: setStudentID,
          name: setName,
          major: setMajor,
          question: { 1: setQuestion },
          timeCreate: setDate,
          timeUpdate: setDate,
          totalTimes: 1
        });
        this.notificationCreate();
//      Update user counter
        cUserRef.once("value", data => {
          var count = data.val() + 1;
          ref.update({
            countUser: count
          });
        });
      }
//    Update question counter
      cQuesRef.once("value", data => {
        var count = data.val() + 1;
        ref.update({
          countQuestion: count
        });
      });
    });
  };
//  Get event submit form
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields({ force: true }, (err, values) => {
      if (!err) {
        this.saveQuestion(values);
      }
    });
  };

  render() {
//  Get new language
    var newLang = this.props.language.name;
//  Check if new language is differrent from old language
    if (newLang !== oldLang) {
      oldLang = newLang;
//    Check if error message exist
      if (document.querySelectorAll(".ant-form-explain").length !== 0) {
        // Render again form
        this.render();
        // Submit again form
        document.querySelectorAll("button")[0].click();
      }
    }
//  Initialize form element
    const { TextArea } = Input;
//  Initialize form function validation
    const { getFieldDecorator } = this.props.form;
//  Initialize form layout
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
//  Initialize form item layout
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
              <h1>{this.props.language.titleForm}</h1>
              <ul className="formNotes">
                {this.props.language.titleNote}
                <li>
                  <Icon type="check" /> {this.props.language.noteList[0]}{" "}
                </li>
                <li>
                  <Icon type="check" /> {this.props.language.noteList[1]}{" "}
                </li>
                <li>
                  <Icon type="check" /> {this.props.language.noteList[2]}{" "}
                </li>
                <li>
                  <Icon type="check" /> {this.props.language.noteList[3]}{" "}
                </li>
              </ul>
            </div>
          </Form.Item>
          <Form.Item label={this.props.language.formList[0].label}>
            {getFieldDecorator("fullname", {
              rules: [
                {
                  required: true,
                  message: this.props.language.formList[0].errMessage[0]
                },
                {
                  pattern: "[A-Za-z]",
                  message: this.props.language.formList[0].errMessage[1]
                }
              ]
            })(
              <Input
                size="large"
                placeholder={this.props.language.formList[0].placeholder}
                autoComplete="off"
              />
            )}
          </Form.Item>
          <Form.Item label={this.props.language.formList[1].label}>
            {getFieldDecorator("studentID", {
              rules: [
                {
                  required: true,
                  message: this.props.language.formList[1].errMessage[0]
                },
                {
                  max: 8,
                  pattern: "[A-Za-z]{2}(0[1-9]|1[0-5])[0-1]{1}[0-9]{3}",
                  message: this.props.language.formList[1].errMessage[1]
                }
              ]
            })(
              <Input
                size="large"
                placeholder={this.props.language.formList[1].placeholder}
                autoComplete="off"
              />
            )}
          </Form.Item>
          <Form.Item label={this.props.language.formList[2].label}>
            {getFieldDecorator("question", {
              rules: [
                {
                  required: true,
                  message: this.props.language.formList[2].errMessage
                }
              ]
            })(<TextArea rows={4} />)}
          </Form.Item>
          <Form.Item label={this.props.language.formList[3].label}>
            {getFieldDecorator("major", {
              rules: [
                {
                  required: true,
                  message: this.props.language.formList[3].errMessage
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
              {this.props.language.submitBtn}
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
//  export QuestionFormw
export default Form.create()(QuestionForm);
