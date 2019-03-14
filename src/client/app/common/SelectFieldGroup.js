import React, { Component } from "react";
import { isEmpty } from "client/app/common/helpers.js";
import onClickOutside from "react-onclickoutside";
import PropTypes from "prop-types";

class SelectFieldGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listOpen: false,
      list: [],
      listCurrent: [],
      filter: ""
    };
    this.onChange = this.onChange.bind(this);
    // this.toggleItem = this.toggleItem.bind(this);
  }
  // get list and add field selected
  parseList(list) {
    const result = list.map(item => {
      item.selected = false;
      return item;
    });
    return result;
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
      const listCurrent = state.listCurrent.map((item, n) => {
        item.title === title ? (item.selected = true) : "";
        return item;
      });
      const list = state.listCurrent.map((item, n) => {
        item.title === title ? (item.selected = true) : "";
        return item;
      });
      this.props.setList(title, this.props.name);
      return {
        listCurrent,
        list,
        filter: ""
      };
    });
  }
  // componentDidMount() {
  //   debugger;
  //   const { listFetch } = this.props;
  // }
  componentWillReceiveProps(next) {
    const { title, listFetch, list } = next;
    // let filter = "";
    // // check has fetch data for update filter and listCurrent
    // if () {
    //   filter = title;
    // } else {

    //   // this.toggleItem(filter);
    // }

    this.setState({
      filter: !isEmpty(title) ? title : listFetch,
      listCurrent: this.parseList(list),
      list: this.parseList(list)
    });
    const checkTitle = !isEmpty(title) ? title : listFetch;

    if (!isEmpty(listFetch)) {
      console.log(listFetch);

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
        const listCurrent = state.listCurrent.map((item, n) => {
          item.title === checkTitle ? (item.selected = true) : "";
          return item;
        });
        const list = state.listCurrent.map((item, n) => {
          item.title === checkTitle ? (item.selected = true) : "";
          return item;
        });
        return {
          listCurrent,
          list
        };
      });
    } else {
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
        const listCurrent = state.listCurrent.map((item, n) => {
          item.title === checkTitle ? (item.selected = true) : "";
          return item;
        });
        const list = state.listCurrent.map((item, n) => {
          item.title === checkTitle ? (item.selected = true) : "";
          return item;
        });
        return {
          listCurrent,
          list
        };
      });
    }
  }

  onChange(e) {
    const { list } = this.props;
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
      this.setState({ list: this.parseList(list) });
    }
  }

  render() {
    const { icon, error, title, headerDefalt, state, isLoaded } = this.props;
    const { listOpen, list, filter } = this.state;
    let emptyTitle = title == "" ? "" : " is-focus";
    let notAllowed = isLoaded ? "" : " c-not-allowed";
    // console.log(list);
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
              {list.length > 0 ? (
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

export default SelectFieldGroup;
