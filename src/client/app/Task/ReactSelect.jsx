import React, { Component, Fragment } from "react";

import Select from "react-select";
// import { open } from "inspector";
// import { colourOptions } from "../data";
// import { Note } from "../styled-components";

const Checkbox = props => <input type="checkbox" {...props} />;

const stateOptions = [
  { value: "AL", label: "Alabama" },
  { value: "AK", label: "Alaska" },
  { value: "AS", label: "American Samoa" },
  { value: "AZ", label: "Arizona" },
  { value: "AR", label: "Arkansas" },
  { value: "CA", label: "California" },
  { value: "CO", label: "Colorado" },
  { value: "CT", label: "Connecticut" },
  { value: "DE", label: "Delaware" },
  { value: "DC", label: "District Of Columbia" },
  { value: "FM", label: "Federated States Of Micronesia" },
  { value: "FL", label: "Florida" },
  { value: "GA", label: "Georgia" },
  { value: "GU", label: "Guam" },
  { value: "HI", label: "Hawaii" },
  { value: "ID", label: "Idaho" },
  { value: "IL", label: "Illinois" },
  { value: "IN", label: "Indiana" },
  { value: "IA", label: "Iowa" },
  { value: "KS", label: "Kansas" },
  { value: "KY", label: "Kentucky" },
  { value: "LA", label: "Louisiana" },
  { value: "ME", label: "Maine" },
  { value: "MH", label: "Marshall Islands" },
  { value: "MD", label: "Maryland" },
  { value: "MA", label: "Massachusetts" },
  { value: "MI", label: "Michigan" },
  { value: "MN", label: "Minnesota" },
  { value: "MS", label: "Mississippi" },
  { value: "MO", label: "Missouri" },
  { value: "MT", label: "Montana" },
  { value: "NE", label: "Nebraska" },
  { value: "NV", label: "Nevada" },
  { value: "NH", label: "New Hampshire" },
  { value: "NJ", label: "New Jersey" },
  { value: "NM", label: "New Mexico" },
  { value: "NY", label: "New York" },
  { value: "NC", label: "North Carolina" },
  { value: "ND", label: "North Dakota" },
  { value: "MP", label: "Northern Mariana Islands" },
  { value: "OH", label: "Ohio" },
  { value: "OK", label: "Oklahoma" },
  { value: "OR", label: "Oregon" },
  { value: "PW", label: "Palau" },
  { value: "PA", label: "Pennsylvania" },
  { value: "PR", label: "Puerto Rico" },
  { value: "RI", label: "Rhode Island" },
  { value: "SC", label: "South Carolina" },
  { value: "SD", label: "South Dakota" },
  { value: "TN", label: "Tennessee" },
  { value: "TX", label: "Texas" },
  { value: "UT", label: "Utah" },
  { value: "VT", label: "Vermont" },
  { value: "VI", label: "Virgin Islands" },
  { value: "VA", label: "Virginia" },
  { value: "WA", label: "Washington" },
  { value: "WV", label: "West Virginia" },
  { value: "WI", label: "Wisconsin" },
  { value: "WY", label: "Wyoming" }
];

export default class SingleSelect extends Component {
  state = {
    isMulti: false,
    isSearchable: false,
    isOpen: true
  };

  toggleMulti = () => {
    this.setState(state => ({
      isMulti: !state.isMulti,
      isOpen: !state.isOpen
    }));
  };
  toggleSearchable = () =>
    this.setState(state => ({ isSearchable: !state.isSearchable }));
  render() {
    const { isSearchable, isMulti, isOpen } = this.state;
    console.log(isOpen);
    return (
      <Fragment>
        <div className="container-width">
          <Select
            className="basic-single"
            classNamePrefix="select"
            isSearchable={isSearchable}
            isMulti={isMulti}
            closeMenuOnSelect={isOpen}
            name="color"
            options={stateOptions}
          />
        </div>

        <div Tag="label">
          <Checkbox
            checked={isMulti}
            onChange={this.toggleMulti}
            id="cypress-single__multi-checkbox"
          />
          Multi Select
        </div>
        <div Tag="label" style={{ marginLeft: "1em" }}>
          <Checkbox
            checked={isSearchable}
            onChange={this.toggleSearchable}
            id="cypress-single__searchable-checkbox"
          />
          Searchable
        </div>
      </Fragment>
    );
  }
}
