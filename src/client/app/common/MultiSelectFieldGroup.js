import React, { Component } from "react";
import onClickOutside from "react-onclickoutside";
import PropTypes from "prop-types";

class MultiSelectFieldGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listOpen: false,
      listCurrent: [],
      listHolder: [],
      list: [],
      filter: ""
    };
    this.onChange = this.onChange.bind(this);
    this.toggleMultiItem = this.toggleMultiItem.bind(this);
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
  checkListOpen() {
    const { listOpen } = this.state;
    if (!listOpen) {
      this.setState({
        listOpen: true
      });
    }
  }
  delectItem(title) {
    this.setState(state => {
      const listCurrent = state.listCurrent.map((item, n) => {
        item.title === title ? (item.selected = false) : "";
        return item;
      });

      const listHolder = state.listHolder;
      listHolder.map((item, n) => {
        if (item.title === title) {
          state.listHolder.splice(n, 1);
        } else {
          return item;
        }
      });
      const listSearch = Object.assign([{}], state.listCurrent);
      const list = listSearch.filter((item, n) => {
        if (item.selected === false) {
          return item;
        }
      });

      return {
        listCurrent,
        listHolder,
        list
      };
    });

    this.refs.filterRef.focus();
  }
  toggleMultiItem(title) {
    this.setState(state => {
      const listCurrent = state.listCurrent.map((item, n) => {
        item.title === title ? (item.selected = true) : "";
        return item;
      });
      const listHolder = state.listCurrent.filter(item => {
        return item.selected == true;
      });

      const list = state.list;
      list.map((item, n) => {
        if (item.title === title) {
          state.list.splice(n, 1);
        } else {
          return item;
        }
      });

      return {
        listCurrent,
        listHolder,
        list,
        filter: ""
      };
    });

    this.setState(state => {
      const list = state.listCurrent.filter(item => {
        if (item.selected === false) {
          return item;
        }
      });
      return { list };
    });

    this.refs.filterRef.style.width = "90px";
    this.refs.filterRef.focus();
  }

  componentWillReceiveProps(next) {
    this.setState({
      filter: next.title,
      list: next.list,
      listCurrent: next.list
    });
  }

  onChange(e) {
    const { style } = this.refs.filterRef;
    if (
      Object.keys(this.state.listHolder).length > 0 &&
      style.width != "140px"
    ) {
      style.width = parseInt(style.width, 10) + 10 + "px";
    }

    this.setState({ filter: e.target.value });
    this.setState(state => {
      const list = state.listCurrent.map(item => {
        item.selected === false;
        return item;
      });
      return {
        list
      };
    });
    if (this.refs.filterRef.value.length > 0) {
      this.setState(state => {
        const list = state.list.filter(item => {
          if (item.title.search(state.filter) != -1) return item;
        });
        return {
          list
        };
      });
    } else {
      // debugger;
      // this.setState({ list: this.clearList("list", this.state.listCurrent) });
    }
  }

  render() {
    const { icon, error, title, headerDefault, state, isLoaded } = this.props;
    const { listOpen, list, listHolder, listCurrent, filter } = this.state;
    let emptyTitle = title == "" ? "" : " is-focus";
    let notAllowed = isLoaded ? "" : " c-not-allowed";

    // const list = this.state.list.filter(item => {
    //   return item.selected === false;
    // });
    console.log("list: ", list);
    console.log("listCurrent: ", listCurrent);
    console.log("listHolder: ", listHolder);

    return (
      <div className="form-group">
        <div
          className={
            error
              ? "from-select error" + emptyTitle + notAllowed
              : "from-select " + emptyTitle + notAllowed
          }
        >
          <i
            className={"i first-child " + icon}
            onClick={() => this.toggleList()}
          />
          <div className="header">
            <div className="listHolder">
              {listHolder.map((item, n) => {
                return (
                  <li key={n} onClick={() => this.delectItem(item.title)}>
                    <i className="k-close" />
                    <span>{item.title}</span>
                  </li>
                );
              })}
            </div>

            <input
              type="text"
              name={title}
              value={filter}
              ref="filterRef"
              placeholder={headerDefault}
              onChange={this.onChange}
              onClick={() => this.checkListOpen()}
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
              onClick={() => this.toggleList()}
            />
          ) : (
            <div className="spinners drop-down" />
          )}

          {listOpen && (
            <ul className="list">
              {list.length > 0 ? (
                list.map((item, n) =>
                  item.selected === false ? (
                    <li
                      className={item.selected ? "item active" : "item"}
                      key={item.title}
                      onClick={() => this.toggleMultiItem(item.title)}
                    >
                      {item.title}{" "}
                      {item.selected && <i className="k-check-box" />}
                    </li>
                  ) : (
                    ""
                  )
                )
              ) : (
                <li className="cursor-text not-found">هیچ موردی پیدا نشد...</li>
              )}
            </ul>
          )}
        </div>
        {error && <label className="invalid-feedback">{error}</label>}
      </div>
    );
  }
}

export default onClickOutside(MultiSelectFieldGroup);
