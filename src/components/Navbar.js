import React, { Component, Fragment } from 'react';
import { NavLink } from "react-router-dom";
import logo from '../../public/styles/images/logo-white.png';
import Register from './auth/Register';
import Logout  from './auth/Logout';
import Login  from './auth/Login';
import { connect } from 'react-redux';
import { NavItem } from 'reactstrap';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    } from "react-router-dom";  
import AddRecipe from "./AddRecipe";
import Home from './Home';
import RecipeList from './RecipeList';
import RecipeDetails from './RecipeDetails';
import PageNotFound from './PageNotFound';
import EditRecipe from './EditRecipe';
import Message from './Message';

class Navbar extends Component {

    render() {

        const { isAuthenticated, user } = this.props.auth;

        const authLinks = (
            <Fragment>
                {/* <NavItem>
                    <span className='navbar-text mr-3'>
                        <strong>{user ? `Welcome ${user.name}` : ''}</strong>
                    </span>
                </NavItem> */}
                <NavLink className="nav-link" to="/recipes/add">Add Recipe</NavLink>
                <NavLink className="nav-link" to="/recipes/list">Recipe List</NavLink>
                <Logout/>
            </Fragment>
        )

        const guestLinks = (
            <Fragment>
                <NavLink className="nav-link" to="/register">Register</NavLink>
                <NavLink className="nav-link" to="/login">Login</NavLink>
            </Fragment>
        )

        const PrivateRoute = ({ component, ...options }) => {
            const finalComponent = isAuthenticated ? component : Message;
            return <Route {...options} component={finalComponent} />;
        };

        return (
            <Router>
                <nav className="navbar">
                    <NavLink className="navbar-brand" exact to="/">
                        <img src={logo} width="43" height="45" />
                    </NavLink>
                    <div className="form-inline">
                        { isAuthenticated? authLinks: guestLinks}
                    </div>
                </nav>
                <Switch>
                    <Route exact path="/"component={Home}/>
                    <Route exact path="/register" component={Register}/>
                    <Route exact path="/login" component={Login}/>
                    <PrivateRoute exact path="/recipes/add" component={AddRecipe}/>
                    <PrivateRoute exact path="/recipes/list" component={RecipeList} />
                    <PrivateRoute exact path="/recipes/view/:id" component={RecipeDetails}/>
                    <PrivateRoute exact path="/recipes/update/:id" component={EditRecipe}/>
                    <Route component={PageNotFound} />
                </Switch>
            </Router>
        )
    }
}


const mapStateToProps = state => ({
    auth: state.auth
  });
  
  export default connect(
    mapStateToProps,
    null
  )(Navbar);

