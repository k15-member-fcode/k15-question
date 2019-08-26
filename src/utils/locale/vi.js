export const vi = {
  name: "vi",
  titlePage: "K15 Đặt Câu Hỏi cùng F-Code",
  titleForm: "Biểu Mẫu Đặt Câu Hỏi K15",
  titleNote: "Chú ý:",
  noteList: [{
      id: 1,
      content: "Từ ngữ lịch sự"
    }, {
      id: 2,
      content: "Có nội dung rõ ràng và liên quan đến câu lạc bộ hoặc các ngành lập trình ở trường"
    }, {
      id: 3,
      content: "Ngôn ngữ cho phép: tiếng Anh hoặc tiếng Việt có dấu"
    }, {
      id: 4,
      content: "Có thể hỏi nhiều hơn một câu hỏi"
    },
    {
      id: 5,
      content: "Không giới hạn số lần hỏi"
    },
  ],
  formList: [{
    id: 1,
    label: "Họ và tên",
    placeholder: "Nhập vào họ tên của bạn",
    errMessage: ["Vui lòng nhập họ tên của bạn!",
      "Họ tên bạn nhập không hợp lệ!"]
  }, {
    id: 2,
    label: "Mã số sinh viên",
    placeholder: "Nhập vào mã sinh viên của bạn",
    errMessage: ["Vui lòng nhập mã sinh viên của bạn!",
      "Mã sinh viên bạn nhập không hợp lệ!"]
  }, {
    id: 3,
    label: "Câu hỏi của bạn",
    placeholder: "",
    errMessage: "Vui lòng nhập câu hỏi của bạn!"
  }, {
    id: 4,
    label: "Chuyên ngành của bạn",
    errMessage: "Vui lòng chọn ngành học của bạn!"
  }],
  submitBtn: "Gửi",
  notiCreate: {
    title: "Gửi thành công",
    content: "Câu hỏi của bạn đã được gửi thành công! Chúng tôi sẽ trả lời bạn trong thời gian sớm nhất."
  },
  notiUpdate: {
    title: "Cập nhật thành công",
    content: "Câu hỏi của bạn đã được cập nhật! Chúng tôi sẽ trả lời bạn trong thời gian sớm nhất."
  },
  notiLang: {
    title: "Thông báo",
    content: "Ngôn ngữ đã được thay đổi."
  },
  footerContent: ["Tạo bởi ThinhTPT", "Hướng dẫn bởi MinhHY", "Bản quyền © 2019 F-Code HCM"]
};
