export const en = {
  name: "en",
  titlePage: "K15 Question with F-Code",
  titleForm: "K15 Question Form",
  titleNote: "Notes:",
  noteList: [{
      id: 1,
      content: "Using polite words"
    }, {
      id: 2,
      content: "Having clear content related to F-Code or programming majors at school"
    }, {
      id: 3,
      content: "Appropriate languages: English or accented Vietnamese"
    }, {
      id: 4,
      content: "Being able to ask more than one question"
    }, {
      id: 5,
      content: "Unlimited number of questions"
    },
  ],
  formList: [{
    id: 1,
    label: "Fullname",
    placeholder: "Input your fullname",
    errMessage: [
      "Please input your fullname!",
      "Invalid your input fullname!"]
  }, {
    id: 2,
    label: "Student ID",
    placeholder: "Input your student ID",
    errMessage: [
      "Please input your student ID!",
      "Student ID must have format: 15xxxx with x is number!"]
  }, {
    id: 3,
    label: "Your Question",
    errMessage: "Please input your question!"
  }, {
    id: 4,
    label: "Your Major",
    errMessage: "Please select your major!"
  }],
  submitBtn: "Send",
  notiCreate: {
    title: "Created successfully",
    content: "Your question has been sent successfully! We will answer you as soon as possible."
  },
  notiUpdate: {
    title: "Updated successfully",
    content: "Your question has been updated successfully! We will answer you as soon as possible."
  },
  notiLang: {
    title: "Notification",
    content: "Language has been changed."
  },
  footerContent: ["Developed by ThinhTPT", "Mentored by MinhHY", "Copyright © 2019 F-Code HCM"]
};
