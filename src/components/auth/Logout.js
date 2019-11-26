import React, { Component, Fragment } from 'react';
import {
  NavLink,
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/authActions';

class Logout extends Component {

  onToggle = () => {
    this.props.logout();
  };

  render() {
    return (
        <NavLink onClick={this.onToggle} href='#'>
          Logout
        </NavLink>
    );
  }
}


export default connect(
  null,
  { logout }
)(Logout);