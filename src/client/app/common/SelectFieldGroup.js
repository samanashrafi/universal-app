import React, { Component } from "react";
import onClickOutside from "react-onclickoutside";
import PropTypes from "prop-types";

class SelectFieldGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listOpen: false,
      list: [],
      filter: ""
    };
    this.onChange = this.onChange.bind(this);
  }

  clearList(nameList, dataList) {
    var temp = dataList.map(obj => {
      var rObj = {};
      rObj["id"] = obj._id;
      rObj["title"] = obj.title;
      rObj["selected"] = false;
      rObj["key"] = nameList;
      return rObj;
    });
    return temp;
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
    this.setState({ filter: next.title, list: next.list });
  }

  onChange(e) {
    const { list } = this.props;
    this.setState({ filter: e.target.value });
    if (this.refs.filterRef.value.length > 0) {
      this.setState(state => {
        // const list = state.list.map(item => item + 1);
        const list = state.list.filter(value => {
          return value.title.search(state.filter) != -1;
        });
        return {
          list
        };
      });
    } else {
      this.setState({ list: this.clearList("list", list) });
    }
  }

  render() {
    const {
      icon,
      error,
      toggleItem,
      title,
      headerDefalt,
      state,
      isLoaded
    } = this.props;
    const { listOpen, list, filter } = this.state;
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
          <div className={filter == "" ? "header" : "header bold"}>
            <input
              type="text"
              name={title}
              value={filter}
              ref="filterRef"
              placeholder={headerDefalt}
              onChange={this.onChange}
              autoComplete="off"
            />
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
              {list.map((item, n) => (
                <li
                  className={item.selected ? "item active" : "item"}
                  key={item.title}
                  onClick={() => toggleItem(n, item.key, state)}
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
