import React, { Component, Fragment } from "react";
import { EditorState, RichUtils } from "draft-js";
import Editor from "draft-js-plugins-editor";
import createHighlightPlugin from "src/client/app/Task/richtext-plugins/highlightPlugin.js";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import FormatAlignLeftIcon from "@material-ui/icons/FormatAlignLeft";
import FormatAlignCenterIcon from "@material-ui/icons/FormatAlignCenter";
import FormatAlignRightIcon from "@material-ui/icons/FormatAlignRight";
import FormatAlignJustifyIcon from "@material-ui/icons/FormatAlignJustify";
import FormatBoldIcon from "@material-ui/icons/FormatBold";
import FormatItalicIcon from "@material-ui/icons/FormatItalic";
import FormatUnderlinedIcon from "@material-ui/icons/FormatUnderlined";
import FormatColorFillIcon from "@material-ui/icons/FormatColorFill";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import Typography from "@material-ui/core/Typography";
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
const highlightPlugin = createHighlightPlugin();

class RichText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      alignment: "left",
      formats: ["bold"]
    };
    this.plugins = [highlightPlugin];
  }
  onChange = editorState => {
    this.setState({ editorState });
  };

  handleKeyCommand = command => {
    const newState = RichUtils.handleKeyCommand(
      this.state.editorState,
      command
    );
    if (newState) {
      this.onChange(newState);
      return "handled";
    }
    return "not-handled";
  };
  onItalicClick = () => {
    // let s = "sss";
    // console.log(s.bold());
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, "ITALIC")
    );
  };
  onBoldClick = () => {
    // this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, "BOLD"));
    this.onChange(this.state.editorState.bold());
  };
  onUnderLineClick = () => {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, "UNDERLINE")
    );
  };
  handleFormat = (event, formats) => this.setState({ formats });

  handleAlignment = (event, alignment) => this.setState({ alignment });

  render() {
    const { classes } = this.props;
    const { alignment, formats } = this.state;
    return (
      <Fragment>
        <div onClick={this.onItalicClick}>
          <em>I</em>
        </div>
        <div onClick={this.onBoldClick}>
          <em>B</em>
        </div>
        <div onClick={this.onUnderLineClick}>
          <em>U</em>
        </div>
        {/* <Grid item xs={12} sm={6}>
          <div className={classes.toggleContainer}>
            <ToggleButtonGroup value={formats} onChange={this.handleFormat}>
              <ToggleButton value="bold" onClick={this.onItalicClick}>
                <FormatBoldIcon />
              </ToggleButton>
              <ToggleButton value="italic" onClick={this.onItalicClick}>
                <FormatItalicIcon />
              </ToggleButton>
              <ToggleButton value="underlined" onClick={this.onUnderLineClick}>
                <FormatUnderlinedIcon />
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
        
        </Grid> */}
        <Editor
          editorState={this.state.editorState}
          handleKeyCommand={this.handleKeyCommand}
          onChange={this.onChange}
          plugins={this.plugins}
        />
      </Fragment>
    );
  }
}
// export default RichText;
export default withStyles(styles)(RichText);
