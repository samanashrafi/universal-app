import React, { Component } from "react";

class Modal extends Component {
  render() {
    const { context, className } = this.props;
    return (
      <div className="modalOverlay">
        <div className="closeButton" />
        <div className={"modal " + className}>{context}</div>
      </div>
    );
  }
}

export default Modal;
