import React, { useState, useRef, useEffect } from "react";
import { Radio } from "antd";
import { en } from "../utils/locale/en";
import { vi } from "../utils/locale/vi";
import { createNotification } from "./Common/Notification";
import QuestionFormTest from "./QuestionFormTest";
import FooterContent from "./FooterContent";

function Locale() {
    const [language, setLanguage] = useState(en);
    const isFirstRun = useRef(true);
    useEffect(() => {
      if (isFirstRun.current) {
        isFirstRun.current = false;
      return;
      }
      else {
        document.title = language.titlePage;
        createNotification(language.notiLang, 3);
      }
    }, [language]);
    const changeLanguage = (newLanguage) => {
      newLanguage = newLanguage.target.value;
      if (newLanguage === vi && language === en) {
        setLanguage(language => vi);
      } else if (newLanguage === en && language === vi) {
        setLanguage(language => en);
      }
    };
    return (
      <div className="Locale">
        <div className="languageRadio">
          <Radio.Group onChange={changeLanguage} defaultValue={language} buttonStyle="solid">
            <Radio.Button value={en}>
              EN
            </Radio.Button>
            <Radio.Button value={vi}>
              VN
            </Radio.Button>
          </Radio.Group>
        </div>
        <QuestionFormTest language={language}/>
        <FooterContent footerContent={language.footerContent} />
      </div>
    );
  };
//  Export Locale
export default Locale;
export const getStyleNotification = () => {
  return {
    color: "#5cb85c"
  };
};
