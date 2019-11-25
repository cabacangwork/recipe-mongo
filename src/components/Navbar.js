import React, { Component, Fragment } from 'react';
import { NavLink } from "react-router-dom";
import logo from '../../public/styles/images/logo-white.png';
import Register from './auth/Register';
import Logout  from './auth/Logout';
import Login  from './auth/Login';
import { connect } from 'react-redux';
import {
    NavItem
  } from 'reactstrap';

class Navbar extends Component {

    render() {

        const { isAuthenticated, user } = this.props.auth;

        const authLinks = (
            <Fragment>
                <NavItem>
                    <span className='navbar-text mr-3'>
                        <strong>{user ? `Welcome ${user.name}` : ''}</strong>
                    </span>
                </NavItem>
                <NavLink className="nav-link" to="/recipes/add">Add Recipe</NavLink>
                <NavLink className="nav-link" to="/recipes">Recipe List</NavLink>
                <Logout/>
            </Fragment>
        )

        const guestLinks = (
            <Fragment>
                <Register/>
                <Login/>
            </Fragment>
        )

        return (
            <nav className="navbar">
                <NavLink className="navbar-brand" exact to="/">
                    <img src={logo} width="43" height="45" />
                </NavLink>
                <div className="form-inline">
                    { isAuthenticated? authLinks: guestLinks}
                </div>
            </nav>
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

