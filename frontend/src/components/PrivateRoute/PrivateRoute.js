import React from 'react';
import { Route, Redirect } from 'react-router-dom';
// import { isLogin } from '../utils';

const PrivateRoute = ({component: Component, ...rest}) => {
    let token = localStorage.getItem('token');
    return (
        // Show the component only when the user is logged in (Have a Token)
        // Otherwise, redirect the user to /main page
        <Route {...rest} render={props => (
            token ?
                <Component {...props} />
            : <Redirect to="/" />
        )} />
    );
};

export default PrivateRoute;