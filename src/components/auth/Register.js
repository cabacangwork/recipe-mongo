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
import { register } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

class Register extends Component {

  state = {
    name: '',
    email: '',
    password: ''
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const { name, email, password } = this.state;
    const newUser = {
      name,
      email,
      password
    };
    this.props.register(newUser);
  };

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    const { history } = this.props;
    if (error !== prevProps.error) {
      // Check for register error
      if (error.id === 'REGISTER_FAIL') {
        alert(error.msg.msg)
      }
    }
    if (isAuthenticated) {
      history.push(`/recipes/list`);
    }
  }

  render() {
    return (
      <div className="register-form">
        <h2>Register</h2>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input type="text" name='name' className="form-control" onChange={this.onChange}/>
          </div>
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
  { register, clearErrors }
)(Register);