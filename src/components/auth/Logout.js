import React, { Component } from 'react';
import icon_logout from '../../../public/styles/images/door.png';
import { connect } from 'react-redux';
import { logout } from '../../actions/authActions';

class Logout extends Component {

  onToggle = (e) => {
    e.preventDefault();
    this.props.logout();
    window.location = '/login'
  };

  render() {
    return (
      <a onClick={this.onToggle}>
        <img className="logout" src={icon_logout} width="25" height="25" />
      </a>
    );
  }
}


export default connect(
  null,
  { logout }
)(Logout);