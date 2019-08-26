import React from "react";

// FooterContent
function FooterContent(props) {
  return (
    <div className="Footer">
      <div className="footerFanpage">
        <iframe title="fanpage F-Code" src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Ffcodefpt%2F&tabs&width=340&height=260&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=2323494424561673"></iframe>
      </div>
      <div className="footerAuthor">
        <span> {props.footerContent[0]} </span> <br />
        <span> {props.footerContent[1]} </span> <br />
        <span> {props.footerContent[2]} </span>{" "}
      </div>
    </div>
  );
}
// Export FooterContent
export default FooterContent;
