import React from "react";
import "./FooterContent.css";
class FooterContent extends React.Component {
  render() {
    return (
      <div className="footer">
        <span> {this.props.footerContent[0]} </span> <br />
        <span> {this.props.footerContent[1]} </span>{" "}
      </div>
    );
  }
}
export default FooterContent;
