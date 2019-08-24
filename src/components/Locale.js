import React from "react";
import { Radio, Icon, notification } from "antd";
import en from "../utils/locale/en";
import vi from "../utils/locale/vi";
import QuestionForm from "./QuestionForm";
import FooterContent from "./FooterContent";

const getStyleNotification = () => {
  return {
    color: "#5cb85c"
  };
};


//  Change language function
const changeLanguage = (language) => {
  language = language.target.value;
  if (language.name === vi && this.state.language === en) {
    this.setState({ language: vi });
    this.notification(vi.notiLang);
    document.title = vi.titlePage;
    this.render();
  } else if (language.name === en && this.state.language === vi) {
    this.setState({ language: en });
    this.notification(en.notiLang);
    document.title = en.titlePage;
    this.render();
  }
};
// Class Locale
class Locale extends React.Component {
  // Setup for language state
  constructor() {
    super();
    this.state = {
      language: en
    };
  }

  render() {
    return (
      <div className="Locale">
        <div className="languageRadio">
          <Radio.Group defaultValue={en} buttonStyle="solid">
            <Radio.Button value={en} onClick={changeLanguage}>
              EN
            </Radio.Button>
            <Radio.Button value={vi} onClick={changeLanguage}>
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
