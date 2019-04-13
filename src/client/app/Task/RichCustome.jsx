import React, { Component, Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";
import FormatAlignLeftIcon from "@material-ui/icons/FormatAlignLeft";
import FormatAlignCenterIcon from "@material-ui/icons/FormatAlignCenter";
import FormatAlignRightIcon from "@material-ui/icons/FormatAlignRight";
import FormatAlignJustifyIcon from "@material-ui/icons/FormatAlignJustify";
import FormatBoldIcon from "@material-ui/icons/FormatBold";
import FormatItalicIcon from "@material-ui/icons/FormatItalic";
import FormatUnderlinedIcon from "@material-ui/icons/FormatUnderlined";
import Undo from "@material-ui/icons/Undo";
import Redo from "@material-ui/icons/Redo";
import FormatListNumbered from "@material-ui/icons/FormatListNumbered";
import FormatListBulleted from "@material-ui/icons/FormatListBulleted";
import Link from "@material-ui/icons/Link";
import Grid from "@material-ui/core/Grid";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";

const styles = theme => ({
  toggleContainer: {
    height: 56,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    margin: `${theme.spacing.unit}px 0`,
    background: theme.palette.background.default
  }
});

class RichCustome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: "",
      alignment: "",
      formats: [""],
      html: ""
    };
    this.textbox = null;
    this.sDefTxt = "";
    this.contentChange = this.contentChange.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    debugger;
    if (nextProps.gethtml) {
      // var s = nextProps.gethtml;
      var htmlObject = document.createElement("div");
      htmlObject.innerHTML = nextProps.gethtml;
      this.setState({ html: htmlObject.innerHTML });
    }
  }
  componentDidMount() {
    this.textbox = document.getElementById("textBox");
    this.sDefTxt = this.textbox.innerHTML;
    // if (document.compForm.switchMode.checked) {
    //   this.setDocMode(true);
    // }
  }
  contentChange() {
    this.textbox = document.getElementById("textBox");
    console.log(this.textbox.innerHTML);
    this.props.setHtml(this.textbox.innerHTML);
  }
  onChange = editorState => {
    this.setState({ editorState });
  };

  setDocMode = bToSource => {
    let oContent;
    if (bToSource) {
      console.log("bToSource :", bToSource);
      oContent = document.createTextNode(oDoc.innerHTML);
      this.textbox.innerHTML = "";
      let oPre = document.createElement("pre");
      this.textbox.contentEditable = false;
      oPre.id = "sourceText";
      oPre.contentEditable = true;
      oPre.appendChild(oContent);
      this.textbox.appendChild(oPre);
    } else {
      console.log("bToSource :", bToSource);

      if (document.all) {
        this.textbox.innerHTML = this.textbox.innerText;
      } else {
        oContent = document.createRange();
        oContent.selectNodeContents(this.textbox.firstChild);
        this.textbox.innerHTML = oContent.toString();
      }
      this.textbox.contentEditable = true;
    }
    this.textbox.focus();
  };
  insertLink = () => {
    var sLnk = prompt("Write the URL here", "http://");
    if (sLnk && sLnk != "" && sLnk != "http://") {
      this.formatDoc("createlink", sLnk);
    } else {
      this.formatDoc("unlink");
    }
  };
  formatDoc = (sCmd, sValue) => {
    // if (validateMode()) {
    document.execCommand(sCmd, false, sValue);
    this.textbox.focus();
    // }
  };
  handleFormat = (event, formats) => this.setState({ formats });

  handleAlignment = (event, alignment) => this.setState({ alignment });

  render() {
    const { classes } = this.props;
    const { alignment, formats } = this.state;
    console.log(this.state.html);
    return (
      <div name="compForm">
        <Grid item xs={12} sm={12}>
          <div className={classes.toggleContainer}>
            {/* <ToggleButtonGroup exclusive onChange={this.handleAlignment}>
             
            </ToggleButtonGroup> */}

            <ToggleButtonGroup>
              <ToggleButton
                value="right"
                onClick={() => this.formatDoc("justifyright")}
              >
                <FormatAlignRightIcon />
              </ToggleButton>
              <ToggleButton
                value="center"
                onClick={() => this.formatDoc("justifycenter")}
              >
                <FormatAlignCenterIcon />
              </ToggleButton>
              <ToggleButton
                value="left"
                onClick={() => this.formatDoc("justifyleft")}
              >
                <FormatAlignLeftIcon />
              </ToggleButton>

              <ToggleButton
                value="justify"
                onClick={() => this.formatDoc("insertorderedlist")}
              >
                <FormatAlignJustifyIcon />
              </ToggleButton>
              <ToggleButton value="bold" onClick={() => this.formatDoc("bold")}>
                <FormatBoldIcon />
              </ToggleButton>
              <ToggleButton
                value="italic"
                onClick={() => this.formatDoc("italic")}
              >
                <FormatItalicIcon />
              </ToggleButton>
              <ToggleButton
                value="underlined"
                onClick={() => this.formatDoc("underlined")}
              >
                <FormatUnderlinedIcon />
              </ToggleButton>
              <ToggleButton>
                <Undo onClick={() => this.formatDoc("undo")} />
              </ToggleButton>
              <ToggleButton>
                <Redo onClick={() => this.formatDoc("redo")} />
              </ToggleButton>
              <ToggleButton>
                <FormatListNumbered
                  onClick={() => this.formatDoc("insertorderedlist")}
                />
              </ToggleButton>
              <ToggleButton>
                <FormatListBulleted
                  onClick={() => this.formatDoc("insertunorderedlist")}
                />
              </ToggleButton>
              <ToggleButton>
                <Link onClick={() => this.insertLink()} />
              </ToggleButton>

              {/* insertorderedlist */}
              {/*   */}
            </ToggleButtonGroup>
          </div>
        </Grid>
        <div
          id="textBox"
          contentEditable={true}
          onInput={this.contentChange}
          onBlur={this.contentChange}
        >
          {this.state.html}
        </div>
      </div>
    );
  }
}
// export default RichText;
export default withStyles(styles)(RichCustome);
