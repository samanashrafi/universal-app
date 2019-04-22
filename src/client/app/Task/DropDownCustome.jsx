import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import Chip from "@material-ui/core/Chip";

import ReactSelect from "src/client/app/Task/ReactSelect.jsx";
import ReactSelectMaterial from "src/client/app/Task/ReactSelectMaterial.jsx";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    maxWidth: 300
  },
  chips: {
    display: "flex",
    flexWrap: "wrap"
  },
  chip: {
    margin: theme.spacing.unit / 4
  },
  noLabel: {
    marginTop: theme.spacing.unit * 3
  }
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder"
];

function getStyles(name, that) {
  return {
    fontWeight:
      that.state.name.indexOf(name) === -1
        ? that.props.theme.typography.fontWeightRegular
        : that.props.theme.typography.fontWeightMedium
  };
}

class MultipleSelect extends React.Component {
  state = {
    name: [],
    multi: false,
    autoSugg: false,
    open: false
  };

  handleChange = event => {
    this.setState({ name: event.target.value });
  };

  Multi = () => {
    this.setState({ multi: !this.state.multi, name: [] });
  };
  autoSugg = () => {
    this.setState({ multi: !this.state.autoSugg, name: [] });
  };
  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  render() {
    const { multi } = this.state;
    const { classes } = this.props;
    console.log(multi);
    return (
      <div className={classes.root}>
        {/* <div onClick={this.Multi}>multi</div> */}

        {/* <FormControl className={classes.formControl}>
          <InputLabel htmlFor="select-multiple-checkbox">Tag</InputLabel>
          <Select
            // open={this.state.open}
            // onClose={this.handleClose}
            // onOpen={this.handleOpen}
            multiple={multi}
            value={this.state.name}
            onChange={this.handleChange}
            SelectInputProps={{
              autoWidth: true
            }}
            // input={<Input name="age" id="age-helper" />}
            inputProps={{
              name: "name",
              id: "name",
              type: this.state.autoSugg ? "text" : "Hidden"
            }}
            renderValue={
              multi
                ? selected => (
                    <div className={classes.chips}>
                      {selected.map(value => (
                        <Chip
                          key={value}
                          label={value}
                          className={classes.chip}
                        />
                      ))}
                    </div>
                  )
                : null
            }
            MenuProps={MenuProps}
          >
            {names.map(name => (
              <MenuItem key={name} value={name}>
                {multi ? (
                  <Checkbox checked={this.state.name.indexOf(name) > -1} />
                ) : null}
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl> */}
        {/* <ReactSelect /> */}
        <ReactSelectMaterial />
      </div>
    );
  }
}

MultipleSelect.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(MultipleSelect);
