import React, { Component } from "react";

class AsideFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openList: -1
    };
    // this.openDropList = ;
  }
  openDropList(i) {
    const { openList } = this.state;
    if (openList == i) {
      this.setState({ openList: -1 });
    } else {
      this.setState({ openList: i });
    }
  }

  render() {
    const { dropDownList } = this.props;
    return (
      <ul className="aside-filter">
        {dropDownList &&
          dropDownList.map((item, i) => {
            return (
              <li
                key={item.id}
                className={this.state.openList == i ? "open" : ""}
              >
                <div
                  className="header"
                  onClick={this.openDropList.bind(this, i)}
                >
                  <span className={item.icon} />
                  <span>{item.title}</span>
                  <span
                    className={
                      this.state.openList == i
                        ? "alo-angle-up"
                        : "alo-angle-down"
                    }
                  />
                </div>
                <div className="list">
                  {item.subItem &&
                    item.subItem.map(sub => {
                      return (
                        <div key={sub.id}>
                          <div className="pretty p-icon p-round p-pulse">
                            <input type="checkbox" />
                            <div className="state p-success">
                              <i className="icon mdi mdi-check" />
                              <label>{sub.title}</label>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </li>
            );
          })}
      </ul>
    );
  }
}

export default AsideFilter;
