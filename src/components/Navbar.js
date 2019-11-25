import React from 'react';
import { NavLink } from "react-router-dom";
import logo from '../../public/styles/images/logo-white.png';
import Register from './auth/Register';

const Navbar = () => {
    return (
        <nav className="navbar">
            <NavLink className="navbar-brand" exact to="/">
                <img src={logo} width="43" height="45" />
            </NavLink>
            <div className="form-inline">
                <NavLink className="nav-link" to="/recipes/add">Add Recipe</NavLink>
                <NavLink className="nav-link" to="/recipes">Recipe List</NavLink>
                <Register/>
            </div>
        </nav>
    )
}

export default Navbar;


