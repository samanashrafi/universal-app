import React from "react";
import PropTypes from "prop-types";
import deburr from "lodash/deburr";
import Downshift from "downshift";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import Chip from "@material-ui/core/Chip";

const suggestions = [
  { label: "تهران" },
  { label: "کرج" },
  { label: "مهران" },
  { label: "اصفهان" },
  { label: "ساری" },
  { label: "سنندح" },
  { label: "کرمان" },
  { label: "قم" },
  { label: "یزد" },
  { label: "آبادان" },
  { label: "اهواز" },
  { label: "بوشهر" },
  { label: "گرگان" },
  { label: "تبریز" },
  { label: "مهاباد" },
  { label: "مشهد" },
  { label: "فارس" },
  { label: "بناب" }
];

// const suggestions = [
//   { label: "Afghanistan" },
//   { label: "Aland Islands" },
//   { label: "Albania" },
//   { label: "Algeria" },
//   { label: "American Samoa" },
//   { label: "Andorra" },
//   { label: "Angola" },
//   { label: "Anguilla" },
//   { label: "Antarctica" },
//   { label: "Antigua and Barbuda" },
//   { label: "Argentina" },
//   { label: "Armenia" },
//   { label: "Aruba" },
//   { label: "Australia" },
//   { label: "Austria" },
//   { label: "Azerbaijan" },
//   { label: "Bahamas" },
//   { label: "Bahrain" },
//   { label: "Bangladesh" },
//   { label: "Barbados" },
//   { label: "Belarus" },
//   { label: "Belgium" },
//   { label: "Belize" },
//   { label: "Benin" },
//   { label: "Bermuda" },
//   { label: "Bhutan" },
//   { label: "Bolivia, Plurinational State of" },
//   { label: "Bonaire, Sint Eustatius and Saba" },
//   { label: "Bosnia and Herzegovina" },
//   { label: "Botswana" },
//   { label: "Bouvet Island" },
//   { label: "Brazil" },
//   { label: "British Indian Ocean Territory" },
//   { label: "Brunei Darussalam" }
// ];
function renderInput(inputProps) {
  const { InputProps, classes, ref, ...other } = inputProps;

  return (
    <TextField
      InputProps={{
        inputRef: ref,
        classes: {
          root: classes.inputRoot,
          input: classes.inputInput
        },
        ...InputProps
      }}
      {...other}
    />
  );
}

function renderSuggestion({
  suggestion,
  index,
  itemProps,
  highlightedIndex,
  selectedItem
}) {
  // debugger;
  const isHighlighted = highlightedIndex === index;
  const isSelected = (selectedItem || "").indexOf(suggestion.label) > -1;

  return (
    <MenuItem
      {...itemProps}
      key={suggestion.label}
      selected={isHighlighted}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400
      }}
    >
      {suggestion.label}
    </MenuItem>
  );
}
renderSuggestion.propTypes = {
  highlightedIndex: PropTypes.number,
  index: PropTypes.number,
  itemProps: PropTypes.object,
  selectedItem: PropTypes.string,
  suggestion: PropTypes.shape({ label: PropTypes.string }).isRequired
};

function getSuggestions(value, selectedItem) {
  const inputValue = deburr(value.trim()).toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;
  if (inputLength === 0) {
    return [];
  }

  const suggestionX = [];
  suggestions.forEach(s => {
    const isExist =
      selectedItem &&
      selectedItem.map(si => si.toLowerCase()).includes(s.label.toLowerCase());

    if (!isExist) suggestionX.push(s);
  });

  const result = suggestionX.filter(item => {
    const keep = count < 5 && item.label.toLowerCase().includes(inputValue);
    if (keep) {
      count += 1;
      return item;
    }
  });

  return result.length == 0 ? [{ label: "هیچ آیتمی پیدا نشد..." }] : result;
}

class DownshiftMultiple extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      selectedItem: [],
      autoSugg: false,
      multi: false
    };
  }

  handleKeyDown = event => {
    const { inputValue, selectedItem } = this.state;
    if (
      selectedItem.length &&
      !inputValue.length &&
      event.key === "Backspace"
    ) {
      this.setState({
        selectedItem: selectedItem.slice(0, selectedItem.length - 1)
      });
    }
  };

  handleInputChange = event => {
    this.setState({ inputValue: event.target.value });
  };

  handleChange = item => {
    let { selectedItem } = this.state;

    if (selectedItem.indexOf(item) === -1) {
      selectedItem = [...selectedItem, item];
    }

    this.setState({
      inputValue: "",
      selectedItem
    });
  };

  handleDelete = item => () => {
    this.setState(state => {
      const selectedItem = [...state.selectedItem];
      selectedItem.splice(selectedItem.indexOf(item), 1);
      return { selectedItem };
    });
  };
  openList = () => {
    this.setState({ openlist: true });
  };
  render() {
    const { classes } = this.props;
    const { inputValue, selectedItem } = this.state;

    return (
      <Downshift
        id="downshift-multiple"
        inputValue={inputValue}
        onChange={this.handleChange}
        selectedItem={selectedItem}
      >
        {({
          getInputProps,
          getItemProps,
          isOpen,
          inputValue: inputValue2,
          selectedItem: selectedItem2,
          highlightedIndex
        }) => (
          <div className={classes.container + " ltr"}>
            {renderInput({
              fullWidth: true,
              classes,
              InputProps: getInputProps({
                startAdornment: selectedItem.map(item => (
                  <Chip
                    key={item}
                    tabIndex={-1}
                    label={item}
                    className={classes.chip}
                    onDelete={this.handleDelete(item)}
                  />
                )),
                // onClick: this.openList,
                onChange: this.handleInputChange,
                onKeyDown: this.handleKeyDown,
                placeholder: "Select multiple countries"
              }),
              label: "Label"
            })}
            {isOpen ? (
              <Paper className={classes.paper} square>
                {getSuggestions(inputValue2, selectedItem).map(
                  (suggestion, index) =>
                    renderSuggestion({
                      suggestion,
                      index,
                      itemProps: getItemProps({ item: suggestion.label }),
                      highlightedIndex,
                      selectedItem: selectedItem2
                    })
                )}
              </Paper>
            ) : null}
          </div>
        )}
      </Downshift>
    );
  }
}

DownshiftMultiple.propTypes = {
  classes: PropTypes.object.isRequired
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 250
  },
  container: {
    flexGrow: 1,
    position: "relative"
  },
  paper: {
    position: "absolute",
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`
  },
  inputRoot: {
    flexWrap: "wrap"
  },
  inputInput: {
    width: "auto",
    flexGrow: 1
  },
  divider: {
    height: theme.spacing.unit * 2
  }
});

let popperNode;

function IntegrationDownshift(props) {
  const { classes } = props;

  return (
    <div className={classes.root + " container-center"}>
      <Downshift id="downshift-simple">
        {({
          getInputProps,
          getItemProps,
          getMenuProps,
          highlightedIndex,
          inputValue,
          isOpen,
          selectedItem
        }) => (
          <div className={classes.container}>
            {renderInput({
              fullWidth: true,
              classes,
              InputProps: getInputProps({
                placeholder: "Search a country (start with a)"
              })
            })}
            <div {...getMenuProps()}>
              {isOpen ? (
                <Paper className={classes.paper} square>
                  {getSuggestions(inputValue).map((suggestion, index) =>
                    renderSuggestion({
                      suggestion,
                      index,
                      itemProps: getItemProps({ item: suggestion.label }),
                      highlightedIndex,
                      selectedItem
                    })
                  )}
                </Paper>
              ) : null}
            </div>
          </div>
        )}
      </Downshift>
      <div className={classes.divider} />
      <DownshiftMultiple classes={classes} />
    </div>
  );
}

IntegrationDownshift.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(IntegrationDownshift);
