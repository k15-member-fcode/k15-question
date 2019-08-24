import React from "react";
import "./FooterContent.css";

//  Class FooterContent
class FooterContent extends React.Component {
  render() {
    return (
      <div className="Footer">
        <span> {this.props.footerContent[0]} </span> <br />
        <span> {this.props.footerContent[1]} </span> <br />
        <span> {this.props.footerContent[2]} </span>{" "}
      </div>
    );
  }
}
// Export FooterContent
export default FooterContent;
