import React, { Component, Fragment } from "react";
import DropDownCustome from "src/client/app/Task/DropDownCustome.jsx";
import RichCustome from "src/client/app/Task/RichCustome.jsx";

class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      richText: ""
    };
  }
  setHtml = richText => {
    this.setState({ richText });
  };

  render() {
    return (
      <div className="container-center">
        <DropDownCustome />
        <RichCustome setHtml={this.setHtml} gethtml={"<p>saman</p>"} />
      </div>
    );
  }
}

export default Task;
