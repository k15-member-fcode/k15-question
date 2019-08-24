import React from "react";
import firebase from "firebase";
import { Form, Radio, Input, Button, Icon, notification } from "antd";
import "./QuestionForm.css";
import logo from "../logo.jpg";
import { en } from "../utils/locale/en";


firebase.initializeApp(firebaseConfig);
const dataQuestion = firebase.database();

const toTitleCase = (str) => {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}
const defaultLanguage = en;


const writeQuestionToFirebase = (submitData) => {
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
      this.notificationUpdate();
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
      this.notificationCreate();
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
const onClickChangeLanguage = () => {
  var newLang = this.props.language.name;
  if (newLang !== oldLang) {
    oldLang = newLang;
    if (document.querySelectorAll(".ant-form-explain").length !== 0) {
      this.render();
      document.querySelectorAll("button")[0].click();
    }
  }
};

class QuestionForm extends React.Component {
  handleSubmit = (event) => {
    e.preventDefault();
    this.props.form.validateFields({ force: true }, (err, values) => {
      if (!err) {
        this.saveQuestion(values);
      }
    });
  };

  render() {
    return (
      <div className="Form">
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item {...tailFormItemLayout}>
            <img alt="logo-fcode" className="logo" src={logo} />
            <div className="titleText">
              <h1>{this.props.language.titleForm}</h1>
              <ul className="formNotes">
                {this.props.language.titleNote}
                {/* <li>
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
                </li> */}
                {this.props.language.noteList.map(note => {
                  return (
                    <li>
                    <Icon type="check" /> {note}{" "}
                  </li>
                  );
                })}
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

export default Form.create()(QuestionForm);
