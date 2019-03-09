import React, { Component } from "react";
import onClickOutside from "react-onclickoutside";
import PropTypes from "prop-types";

class SelectFieldGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listOpen: false,
      filter: ""
    };
    this.onChange = this.onChange.bind(this);
  }
  handleClickOutside() {
    this.setState({
      listOpen: false
    });
  }
  toggleList() {
    this.setState(prevState => ({
      listOpen: !prevState.listOpen
    }));
  }

  componentWillReceiveProps(next) {
    this.setState({ filter: next.title });
  }
  onChange(e) {
    this.setState({ filter: e.target.value });
  }

  render() {
    const {
      list,
      icon,
      error,
      toggleItem,
      title,
      headerDefalt,
      state,
      isLoaded
    } = this.props;
    const { listOpen, filter } = this.state;
    let emptyTitle = title == "" ? "" : " is-focus";
    let notAllowed = isLoaded ? "" : " c-not-allowed";
    const filterList = list.filter(value => {
      return value.title.search(filter) != -1;
    });
    console.log("filterList: ", filterList);
    return (
      <div className="form-group">
        <div
          className={
            error
              ? "from-select error" + emptyTitle + notAllowed
              : "from-select " + emptyTitle + notAllowed
          }
          onClick={() => this.toggleList()}
        >
          <i className={"i first-child " + icon} />
          <div className={filter == "" ? "header" : "header bold"}>
            <input
              type="text"
              name={title}
              value={filter}
              placeholder={headerDefalt}
              onChange={this.onChange}
              autoComplete="off"
            />
            {/* {title ? title : headerDefalt} */}
          </div>
          {isLoaded ? (
            <i
              className={
                listOpen
                  ? "k-angle-down i last-child rotate"
                  : "i last-child k-angle-down "
              }
            />
          ) : (
            <div className="spinners drop-down" />
          )}

          {listOpen && (
            <ul className="list">
              {filterList.map((item, n) => (
                <li
                  className={item.selected ? "item active" : "item"}
                  key={item.title}
                  onClick={() => toggleItem(n, item.key, state, filterList)}
                >
                  {item.title} {item.selected && <i className="k-check-box" />}
                </li>
              ))}
            </ul>
          )}
        </div>
        {error && <label className="invalid-feedback">{error}</label>}
      </div>
    );
  }
}

export default onClickOutside(SelectFieldGroup);
