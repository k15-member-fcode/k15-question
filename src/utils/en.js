var en = {
  titlePage: "K15 Question with F-Code",
  titleForm: "K15 Question Form",
  titleNote: "Notes:",
  noteList: [
    "Respecting to members of F-Code",
    "Having clear content related to F-Code or programming majors at school",
    "Using appropriate languages: English or accented Vietnamese",
    "Being able to ask more than one question"
  ],
  formList: [
    {
      id: 1,
      label: "Fullname",
      placeholder: "Input your fullname",
      errMessage: ["Please input your fullname!",
                    "Invalid your fullname!"]
    },
    {
      id: 2,
      label: "Student ID",
      placeholder: "Input your student ID",
      errMessage: ["Please input your student ID!",
                    "Invalid your student ID!"]
    },
    {
      id: 3,
      label: "Your Question",
      errMessage: "Please input your question!"
    },
    {
      id: 4,
      label: "Your Major",
      errMessage: "Please select your major!"
    }
  ],
  submitBtn: "Send",
  notiCreate: {
    title: "Created successfully",
    content:
      "Your question has been sent successfully! We will answer you as soon as possible."
  },
  notiUpdate: {
    title: "Updated successfully",
    content:
      "Your question has been updated successfully! We will answer you as soon as possible."
  },
  notiLang: {
    title: "Notification",
    content: "Language has been changed."
  },
  footerContent: ["Created by F-Code", "FPT University"]
};

export default en;
