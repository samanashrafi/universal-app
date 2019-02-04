import Home from 'client/app/home.jsx';
import User from 'client/app/user.jsx';
import Test from 'client/app/Test.jsx';
import AcademyList from 'client/app/academylist/AcademyList.jsx';



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
            path: '/search',
            component: AcademyList
        },
        {
            path: '/test/:id',
            component: Test,
            exact: true
        }
    ],
    redirects: [{
        from: '/people',
        to: '/user',
        status: 301
    }]
}