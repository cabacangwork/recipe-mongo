import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions/authActions';

class Login extends Component {
  state = {
    modal: false,
    email: '',
    password: ''
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;
    const user = {
      email,
      password
    };
    this.props.login(user);
  };

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated, history } = this.props;
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
  { login }
)(Login);