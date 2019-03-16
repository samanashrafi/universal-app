import React, { Component } from "react";
import onClickOutside from "react-onclickoutside";
import PropTypes from "prop-types";
import { isEmpty } from "client/app/common/helpers.js";

class MultiSelectFieldGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listOpen: false, // close & open list
      listCurrent: [], // list orginal
      listHolder: [], // item selected
      list: [], // list filter
      filter: "", // filter textbox
      Multi: false
    };
    this.onChange = this.onChange.bind(this);
    this.toggleMultiItem = this.toggleMultiItem.bind(this);
  }

  // get list and add field selected
  parseList(list) {
    const result = list.map(item => {
      item.selected = false;
      return item;
    });
    return result;
  }

  // close Dropdown list out side component with onClickOutside (HOC)
  handleClickOutside() {
    this.setState({
      listOpen: false
    });
  }
  // close Dropdown list with click in icon or text input
  toggleList() {
    this.setState(prevState => ({
      listOpen: !prevState.listOpen
    }));
  }
  // checking if listOpen is fasle and then  Dropdown list it's be open (when use textbox search)
  checkListOpen() {
    const { listOpen } = this.state;
    if (!listOpen) {
      this.setState({
        listOpen: true
      });
    }
  }
  // checking title list equal
  checkTitleItem(title, list, selected) {
    const result = list.map(item => {
      item.title === title ? (item.selected = selected) : "";
      return item;
    });
    return result;
  }
  // filter items if selected item is false or true
  filterTitleItem(list, selected) {
    const result = list.filter(item => {
      return item.selected === selected;
    });
    return result;
  }
  // delete Items in listHolder and update listCurrent & list (for Multi select)
  deleteItem(title) {
    this.setState(state => {
      const listCurrent = this.checkTitleItem(title, state.listCurrent, false);

      const listHolder = state.listHolder;
      listHolder.map((item, n) => {
        if (item.title === title) {
          state.listHolder.splice(n, 1);
        } else {
          return item;
        }
      });
      const list = this.filterTitleItem(state.listCurrent, false);
      this.props.setList(this.state.listHolder, this.props.name);
      return {
        listCurrent,
        listHolder,
        list
      };
    });

    this.refs.filterRef.focus();
  }
  // add Items in listHolder and update listCurrent & list (for Multi select)
  toggleMultiItem(title) {
    // add Items in listHolder and update  listCurrent & list
    this.setState(state => {
      const listCurrent = this.checkTitleItem(title, state.listCurrent, true);
      const listHolder = this.filterTitleItem(state.listCurrent, true);
      this.props.setList(listHolder, this.props.name);

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

    // update list when select item in listCurrent
    this.setState(state => {
      const list = this.filterTitleItem(state.listCurrent);
      return { list };
    });

    this.refs.filterRef.style.width = "90px";
    this.refs.filterRef.focus();
  }
  // add Items in listHolder and update listCurrent & list (for single select)
  toggleItem(title) {
    this.setState(state => {
      const list = state.listCurrent.map(item => {
        item.selected = false;
        return item;
      });
      return {
        list
      };
    });

    this.setState(state => {
      const listCurrent = this.checkTitleItem(title, state.listCurrent, true);
      const list = this.checkTitleItem(title, state.listCurrent, true);
      this.props.setList(title, this.props.name);
      return {
        listCurrent,
        list,
        filter: ""
      };
    });
  }
  // set all props we need control lists
  componentWillReceiveProps(next) {
    const { title, listFetch, list, multi } = next;
    let listHolder = [];
    // check has fetch data for update listHolder or not data get list defualt listHolder
    // switch in single or multi select
    if (multi) {
      if (title.length > 0) {
        listHolder = title;
      } else {
        listHolder = listFetch;
      }
      this.setState({
        list: this.parseList(list),
        listCurrent: this.parseList(list),
        listHolder,
        Multi: multi
      });
      // update  listCurrent when recive listFetch prop
      if (this.state.listHolder.length > 0) {
        this.setState(state => {
          const listCurrent = state.list.map(item => {
            const find = state.listHolder.findIndex(value => {
              return value.title === item.title;
            });
            if (find != -1) {
              item.selected = true;
            }
            return item;
          });
          const list = this.filterTitleItem(listCurrent, false);

          return {
            listCurrent,
            list
          };
        });
      }
    } else {
      this.setState({
        filter: !isEmpty(title) ? title : listFetch,
        listCurrent: this.parseList(list),
        list: this.parseList(list)
      });

      const checkTitle = !isEmpty(title) ? title : listFetch;

      if (!isEmpty(listFetch)) {
        this.setState(state => {
          const list = state.listCurrent.map(item => {
            item.selected = false;
            return item;
          });
          return {
            list
          };
        });
        this.setState(state => {
          const listCurrent = this.filterTitleItem(state.listCurrent, false);
          const list = this.filterTitleItem(state.listCurrent, false);

          return {
            listCurrent,
            list,
            listOpen: false
          };
        });
      } else {
        this.setState(state => {
          const list = this.parseList(state.listCurrent);

          return {
            list
          };
        });
        this.setState(state => {
          const listCurrent = this.checkTitleItem(
            checkTitle,
            state.listCurrent,
            true
          );
          const list = this.checkTitleItem(checkTitle, state.listCurrent, true);

          return {
            listCurrent,
            list,
            listOpen: false
          };
        });
      }
    }
  }
  // search list
  onChange(e) {
    const { style } = this.refs.filterRef;
    const { list, multi } = this.props;
    this.setState({ filter: e.target.value });

    if (multi) {
      if (
        Object.keys(this.state.listHolder).length > 0 &&
        style.width != "140px"
      ) {
        style.width = parseInt(style.width, 10) + 10 + "px";
      }

      // reset list
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
        //search list
        this.setState(state => {
          const list = state.list.filter(item => {
            if (item.title.search(state.filter) != -1) return item;
          });
          return {
            list
          };
        });
      }
    } else {
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
        this.setState({ list: this.parseList(list) });
      }
    }
  }

  render() {
    const {
      icon,
      error,
      title,
      headerDefault,
      multi,
      field,
      isLoaded
    } = this.props;
    const { listOpen, list, listHolder, listCurrent, filter } = this.state;
    let emptyTitle = title == "" ? "" : " is-focus";
    let notAllowed = isLoaded ? "" : " c-not-allowed";

    // console.log("list: ", list);
    // console.log("listCurrent: ", listCurrent);
    // console.log("listHolder: ", listHolder);

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
              {multi &&
                listHolder.map((item, n) => {
                  return (
                    <li key={n} onClick={() => this.deleteItem(item.title)}>
                      <i className="k-close" />
                      <span>{item.title}</span>
                    </li>
                  );
                })}
            </div>

            <input
              type="text"
              value={filter}
              ref="filterRef"
              placeholder={headerDefault}
              onChange={this.onChange}
              onClick={() => (multi ? this.checkListOpen() : this.toggleList())}
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
                multi ? (
                  list.map((item, n) =>
                    item.selected === false ? (
                      <li
                        className={item.selected ? "item active" : "item"}
                        key={item.title}
                        onClick={() => this.toggleMultiItem(item.title)}
                      >
                        {item.title} {field && "( " + item[field] + " )"}
                        {item.selected && <i className="k-check-box" />}
                      </li>
                    ) : (
                      ""
                    )
                  )
                ) : (
                  list.map((item, n) => (
                    <li
                      className={item.selected ? "item active" : "item"}
                      key={item.title}
                      onClick={() => this.toggleItem(item.title)}
                    >
                      {item.title}
                      {item.selected && <i className="k-check-box" />}
                    </li>
                  ))
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

MultiSelectFieldGroup.defaultProps = {
  multi: false
};
export default onClickOutside(MultiSelectFieldGroup);
