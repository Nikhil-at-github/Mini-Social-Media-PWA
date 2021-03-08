import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from './components/Login';
import Register from './components/Register';
import Forgetpassword from './components/Forgotpassword';
import ResetCredentials from './components/ResetCredentials';
import Dashboard from './components/Dashboard/Dashboard';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Explore from './components/Explore/Explore';
import Mypost from './components/Mypost/Mypost';
import AddPost from './components/AddPost/AddPost'

function App() {
    return (
      <Router>
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/Register" exact component={Register} />
            <Route path="/forgetpassword" exact component={Forgetpassword} /> 
            <Route path="/reset/:id" exact component={ResetCredentials} /> 
            {/* <PrivateRoute path="/" exact component={Dashboard} /> */}
            <PrivateRoute path="/dashboard" exact component={Dashboard} />
            <PrivateRoute path="/explore" exact component={Explore} />
            <PrivateRoute path="/mypost" exact component={Mypost} />
            <PrivateRoute path="/addpost" exact component={AddPost} />
            <Route path="*" component={() => "404 page not found!"}/>
            {/* <Route path="*" component={() => "404 page not found!"}/> */}
          </Switch>
      </Router>
    )
}

export default App;
