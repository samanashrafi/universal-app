import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
    static fetchData() {
        console.log('test');
    }
    render() {
        return (
            <div>
                <ul>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/user'>User</Link></li>
                    <li><Link to='/test/1'>Test 1</Link></li>
                    <li><Link to='/test/2'>Test 2</Link></li>
                    <li><Link to='/test/3'>Test 3</Link></li>
                </ul>
            </div>
        );
    }
}
export default Home;