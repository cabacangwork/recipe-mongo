import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

class Login extends Component {
  state = {
    modal: false,
    email: '',
    password: ''
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    const { isAuthenticated } = this.props;
    e.preventDefault();
    const { email, password } = this.state;
    const user = {
      email,
      password
    };
    this.props.login(user);
  };

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    const { history } = this.props;
    if (isAuthenticated) {
      history.push(`/recipes/list`);
    }
    if (error !== prevProps.error) {
      if (error.id === 'LOGIN_FAIL') {
        alert(error.msg.msg)
      }
    }
  }

  render() {
    return (
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Email address</label>
            <input type="email" name='email' className="form-control" onChange={this.onChange}/>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" name='password' className="form-control" onChange={this.onChange}/>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>  
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(
  mapStateToProps,
  { login, clearErrors }
)(Login);