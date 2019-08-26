import React from "react";

function FooterContent(props) {
  return (
    <div className="Footer">
      <span> {props.footerContent[0]} </span> <br />
      <span> {props.footerContent[1]} </span> <br />
      <a
        href="https://www.facebook.com/fcodefpt/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span> {props.footerContent[2]} </span>{" "}
      </a>
    </div>
  );
}

export default FooterContent;
