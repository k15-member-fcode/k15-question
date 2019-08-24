import React from "react";
import { Radio, Icon, notification } from "antd";
import en from "./en";
import vi from "./vi";
import QuestionForm from "./QuestionForm";
import FooterContent from "./FooterContent";

// Class Locale
class Locale extends React.Component {
// Setup for language state
  constructor() {
    super();
    this.state = {
      language: en
    };
  }
//  Notification successfull changing language
  notification = notiLang => {
    notification.open({
      message: notiLang.title,
      description: notiLang.content,
      icon: <Icon type="check-circle" style={{ color: "#5cb85c" }} />
    });
  };
//  Change language function
  setLanguage(language) {
//  Get language value
    language = language.target.value;
//  Check if language has been change into Vietnamese
    if (language === "vi" && this.state.language === en) {
//    Set new language state
      this.setState({
        language: vi
      });
//    Notification language change
      this.notification(vi.notiLang);
//    Change title
      document.title = vi.titlePage;
//    Render again Locale
      this.render();
//  Check if language has been change into English
    } else if (language === "en" && this.state.language === vi) {
      // console.log("en");
      this.setState({
        language: en
      });
      this.notification(en.notiLang);
      document.title = en.titlePage;
      this.render();
    }
  }

  render() {
    return (
      <div className="Locale">
        <div className="languageRadio">
          <Radio.Group defaultValue="en" buttonStyle="solid">
            <Radio.Button
              value="en"
              onClick={language => this.setLanguage(language)}
            >
              EN
            </Radio.Button>
            <Radio.Button
              value="vi"
              onClick={language => this.setLanguage(language)}
            >
              VN
            </Radio.Button>
          </Radio.Group>
        </div>
        <QuestionForm language={this.state.language} />
        <FooterContent footerContent={this.state.language.footerContent} />
      </div>
    );
  }
}
//  Export Locale
export default Locale;
