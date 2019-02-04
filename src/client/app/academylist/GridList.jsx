import React, { Component } from "react";
import {Link} from 'react-router-dom'

// class GridList extends Component {
//   render() {
//     const { academyList } = this.props;
//     return (
//       <div className="grid-list">
//         <div className="box">
//           {academyList &&
//             academyList.map(item => {
//               return (
//                 <div key={item.id} className="item m-b">
//                   {item.title_Fa}
//                 </div>
//               );
//             })}
//         </div>
//       </div>
//     );
//   }
// }


const GridList = academyList =>{
  return (
     <Link to={"academydetails/"+ academyList.id} key={academyList.id} className="item m-b">
          <div className="img">

          </div>
          <h2>
          {academyList.title_Fa}

          </h2>
     </Link>
  )
}

export default GridList;
