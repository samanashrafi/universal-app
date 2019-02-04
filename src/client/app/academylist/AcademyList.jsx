import React from "react";

import withSearch from "client/app/academylist/WithSearch.jsx";
import GridList from "client/app/academylist/GridList.jsx";

const Location = props => {
  const { academyList, dropDownList } = props;
  return (
    <div className="body">
      <div className="box">
        {academyList && academyList.length == 0 ? (
          <div className="m-r">موردی یافت نشد!!!</div>
        ) : (
          academyList.map((item, i) => {
            return <GridList key={i} {...item} />;
          })
        )}
      </div>
    </div>
  );
};

export default withSearch(Location);
