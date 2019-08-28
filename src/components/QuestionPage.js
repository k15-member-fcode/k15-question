import React, { useState, useRef, useEffect } from "react";
import { Radio } from "antd";
import QuestionForm from "./QuestionForm";
import FooterContent from "./FooterContent";
import { en } from "../utils/locale/en";
import { vi } from "../utils/locale/vi";
import { createNotification } from "./Common/Notification";

const QuestionPage = () => {
  const [language, setLanguage] = useState(en);
  const isFirstRun = useRef(true);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    } else {
      document.title = language.titlePage;
      createNotification(language.notiLang, 3);
    }
  }, [language]);

  const changeLanguage = newLanguage => {
    newLanguage = newLanguage.target.value;
    if (newLanguage === vi && language === en) {
      setLanguage(vi);
    } else if (newLanguage === en && language === vi) {
      setLanguage(en);
    }
  };

  return (
    <div className="QuestionPage">
      <div className="languageRadio">
        <Radio.Group
          onChange={changeLanguage}
          defaultValue={language}
          buttonStyle="solid"
        >
          <Radio.Button value={en}>EN</Radio.Button>
          <Radio.Button value={vi}>VN</Radio.Button>
        </Radio.Group>
      </div>
      <QuestionForm language={language} />
      <FooterContent footerContent={language.footerContent} />
    </div>
  );
}

export default QuestionPage;
