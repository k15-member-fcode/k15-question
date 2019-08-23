var vi = {
  titlePage: "K15 Đặt Câu Hỏi cùng F-Code",
  titleForm: "Biểu Mẫu Đặt Câu Hỏi K15",
  titleNote: "Chú ý:",
  noteList: [
    "Tôn trọng các thành viên F-Code",
    "Có nội dung rõ ràng và liên quan đến câu lạc bộ hoặc các ngành lập trình ở trường",
    "Sử dụng ngôn ngữ cho phép: tiếng Anh hoặc tiếng Việt có dấu",
    "Có thể hỏi nhiều hơn một câu hỏi"
  ],
  formList: [
    {
      id: 1,
      label: "Họ và tên",
      placeholder: "Nhập vào họ tên của bạn",
      errMessage: ["Hãy nhập họ tên của bạn!",
                    "Họ tên của bạn không hợp lệ!"]
    },
    {
      id: 2,
      label: "Mã số sinh viên",
      placeholder: "Nhập vào mã sinh viên của bạn",
      errMessage: ["Hãy nhập mã sinh viên của bạn!",
                    "Mã sinh viên của bạn không hợp lệ!"]
    },
    {
      id: 3,
      label: "Câu hỏi của bạn",
      placeholder: "",
      errMessage: "Hãy nhập câu hỏi của bạn!"
    },
    {
      id: 4,
      label: "Chuyên ngành của bạn",
      errMessage: "Hãy chọn ngành học của bạn!"
    }
  ],
  submitBtn: "Gửi",
  notiCreate: {
    title: "Gửi thành công",
    content:
      "Câu hỏi của bạn đã được gửi thành công! Chúng tôi sẽ trả lời bạn trong thời gian sớm nhất."
  },
  notiUpdate: {
    title: "Cập nhật thành công",
    content:
      "Câu hỏi của bạn đã được cập nhật! Chúng tôi sẽ trả lời bạn trong thời gian sớm nhất."
  },
  notiLang: {
    title: "Thông báo",
    content: "Ngôn ngữ đã được thay đổi."
  },
  footerContent: ["Tạo bởi câu lạc bộ F-Code", "Trường Đại học FPT"]
};
export default vi;
