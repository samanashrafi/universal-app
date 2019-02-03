import Home from 'client/app/home.jsx';
import User from 'client/app/user.jsx';
import Test from 'client/app/Test.jsx';


export default {
    routes: [
        {
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
            path: '/test/:id',
            component: Test,
            exact: true
        }
    ],
    redirects: [
        {
            from: '/people',
            to: '/user',
            status: 301
        }
    ]
} 