import React, { Component } from 'react';
import { connect } from 'react-redux';
import { register } from '../../actions/authActions';

class Register extends Component {

  state = {
    name: '',
    email: '',
    password: ''
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
    const { error, isAuthenticated, history } = this.props;
    if (error !== prevProps.error) {
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
  { register }
)(Register);