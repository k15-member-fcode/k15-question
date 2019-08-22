import React from 'react';
import {Form, Input, Button, Radio, Icon, notification} from 'antd';
import './QuestionForm.css';

const close = () => {
  console.log(
    'Notification was closed. Either the close button was clicked or duration time elapsed.',
  );
};

const notificationSuccess = () => {
  const key = 'open${Date.now()}';
  const btn = (
   <Button type="primary" size="small" onClick={() => notification.close(key)}>
     Confirm
   </Button>
 );
  notification.open({
    message: 'Notification',
    description:
      'Your question has been sent successfully! We will answer you as soon as possible.',
    btn,
    key,
    icon: <Icon type="check-circle" style={{ color: '#5cb85c' }}/>,
    duration: 0,
  });
};

class QuestionForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        notificationSuccess();
      }
    });
  }
  render () {
    const { TextArea } = Input;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    return (
    <div className="Form">
      <div className="languageRadio">
        <Radio.Group defaultValue="en" buttonStyle="solid">
          <Radio.Button value="en">EN</Radio.Button>
          <Radio.Button value="vn">VN</Radio.Button>
        </Radio.Group>
      </div>
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item {...tailFormItemLayout}>
          <h1>K15 Question Form</h1>
          <ul className="formNotes">Notes:
            <li><Icon type="check" /> Respecting to members of F-Code</li>
            <li><Icon type="check" /> Having a clear content related to F-Code or programing majors at school</li>
            <li><Icon type="check" /> Using appropriate languages: English or accented Vietnamese</li>
            <li><Icon type="check" /> Being able to ask more than one question</li>
          </ul>
        </Form.Item>
        <Form.Item label="Name">
          {getFieldDecorator('name', {
              rules: [{ required: true, message: 'Please input your name!' }],
            })(<Input size="large" placeholder="Input your name"/>)}
        </Form.Item>
        <Form.Item label="Student ID">
          {getFieldDecorator('studentID', {
              rules: [{ required: true, message: 'Please input your student ID!' }],
            })(<Input size="large" name="" placeholder="Input your student ID"/>)}
        </Form.Item>
        <Form.Item label="Your Question">
          {getFieldDecorator('question', {
              rules: [{ required: true, message: 'Please input your question!' }],
            })(<TextArea rows={4} />)}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" onClick={ this.sendQuestion}>
            Send
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
  }
}
export default Form.create()(QuestionForm);
