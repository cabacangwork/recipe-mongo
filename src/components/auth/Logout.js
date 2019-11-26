import React, { Component } from 'react';
import icon_logout from '../../../public/styles/images/door.png';
import { NavLink } from 'reactstrap';
import { connect } from 'react-redux';
import { logout } from '../../actions/authActions';

class Logout extends Component {

  onToggle = () => {
    this.props.logout();
    window.location = '/login'
  };

  render() {
    return (
      <NavLink onClick={this.onToggle} className="navbar-brand" exact to="/">
        <img className="logout" src={icon_logout} width="25" height="25" />
      </NavLink>
    );
  }
}


export default connect(
  null,
  { logout }
)(Logout);