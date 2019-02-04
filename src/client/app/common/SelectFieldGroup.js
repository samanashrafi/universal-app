import React, { Component } from "react";
import onClickOutside from "react-onclickoutside";
import PropTypes from "prop-types";

class SelectFieldGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listOpen: false
    };
    // this.toggleItem = this.toggleItem.bind(this)
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
    const { listOpen } = this.state;
    let emptyTitle = title == "" ? "" : " is-focus";
    let notAllowed = isLoaded ? "" : " c-not-allowed";

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
          <div className={title == "" ? "header" : "header bold"}>
            {title ? title : headerDefalt}
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

          { listOpen && (
            <ul className="list">
              {list.map((item,n) => (
                <li
                  className={item.selected ? "item active" : "item"}
                  key={item.title}
                  onClick={() => toggleItem(n, item.key, state)}
                >
                  {item.title}{" "}
                  {item.selected && <i className="k-check-box" />}
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
