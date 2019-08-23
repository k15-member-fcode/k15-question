import React from "react";
import { Radio, Icon, notification } from "antd";
import en from "./en";
import vi from "./vi";
import QuestionForm from "./QuestionForm";
import FooterContent from "./FooterContent";

class Locale extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      language: en
    };
  }
  notification = notiLang => {
    notification.open({
      message: notiLang.title,
      description: notiLang.content,
      icon: <Icon type="check-circle" style={{ color: "#5cb85c" }} />
    });
  };

  getLanguage(language) {
    language = language.target.value;
    if (language === "vi" && this.state.language === en) {
      console.log("vi");
      this.setState({
        language: vi
      });
      this.notification(vi.notiLang);
      document.title = vi.titlePage;
    } else if (language === "en" && this.state.language === vi) {
      console.log("en");
      this.setState({
        language: en
      });
      this.notification(en.notiLang);
      document.title = en.titlePage;
    }
  }
  render() {
    return (
      <div>
        <div className="languageRadio">
          <Radio.Group defaultValue="en" buttonStyle="solid">
            <Radio.Button
              value="en"
              onClick={language => this.getLanguage(language)}
            >
              EN
            </Radio.Button>
            <Radio.Button
              value="vi"
              onClick={language => this.getLanguage(language)}
            >
              VN
            </Radio.Button>
          </Radio.Group>
        </div>
        <QuestionForm
          titleForm={this.state.language.titleForm}
          titleNote={this.state.language.titleNote}
          noteList={this.state.language.noteList}
          formList={this.state.language.formList}
          submitBtn={this.state.language.submitBtn}
          notiCreate={this.state.language.notiCreate}
          notiUpdate={this.state.language.notiUpdate}
        />
        <FooterContent footerContent={this.state.language.footerContent} />
      </div>
    );
  }
}
export default Locale;
