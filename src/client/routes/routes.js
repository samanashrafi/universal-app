// import Loadable  from 'react-loadable'

import Home from 'client/app/home.jsx';
import User from 'client/app/user.jsx';
import AcademyDetails from 'client/app/academydetails/AcademyDetails.jsx';
import AcademyList from 'client/app/academylist/AcademyList.jsx';
import Partners from 'client/app/Partners.jsx';

// const LoadableUser = Loadable({
//     loader: () => import('client/app/user.jsx'),
//     loading: <div>در حال بارگذاری</div>,
//   });

export default {
    routes: [{
            path: '/',
            component: Home,
            exact: true
        },
        {
            path: '/user',
            component: User,
            exact: true
        },
        {
            path: '/partner',
            component: Partners,
            exact: true
        },
        {
            path: '/search',
            component: AcademyList
        },
        {
            path: '/academydetails/:id',
            component: AcademyDetails,
            exact: true
        }
    ],
    redirects: [{
        from: '/people',
        to: '/user',
        status: 301
    }]
}