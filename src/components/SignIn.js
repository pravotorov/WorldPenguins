import React, { Component } from 'react';
import axios from 'axios';
import '../styles/register.css';
import { Link, NavLink, withRouter } from 'react-router-dom';


export default class SignUp extends Component {
  state = {
    password: '',
    email: '',
    isErrorsText: false
  };
  
  onChange = ({ target }) => {
    this.setState({
      [target.name]: target.value
    });
  };

  signInUser = async user => {
    
      await axios.post('http://localhost:5000/user/login', user)
      .then(res => {
        localStorage.setItem('token', res.data);
        window.location = '../../';
      })
      .catch (err => {
      this.setState({ isErrorsText: err.response.data });
    
    })
  };

  onSubmit = e => {
    e.preventDefault();
    this.signInUser(this.state);
    
    this.setState({
      password: '',
      email: '',
      isErrorsText: false
    });
  };

  render() {

    const isLoggedIn = this.state.isErrorsText;
    let titleSign;

    if(isLoggedIn) {
    titleSign = 
    <div className="titleSign">
      <h3 className='center'>Welcome</h3>
      <h4 className='center'>In world Penguins</h4>
      <h1 className='center titleError'>{this.state.isErrorsText}</h1>
    </div>
    } else {
    titleSign = 
      <div className="titleSign">
      <h3 className='center'>Welcome</h3>
      <h4 className='center'>In world Penguins</h4>
    </div>
    }

    return (
      <div className="center signImg">
        <div className='container regist'>
    <div className='row z-depth-4 windowRegist'>
      <div className='col s12'>
        {titleSign}
        <form className='col s12' onSubmit={this.onSubmit}>
        <div className="row formSign"> 
        <div className="input-field col s12 fieldSign">
            <i className="material-icons prefix">email</i>
            <input
                name='email'
                id='email'
                type='email'
                className='validate'
                value={this.state.email}
                required
                onChange={this.onChange}
                placeholder="Email"
              />
          </div>
          <div className="input-field col s12 fieldSign">
            <i className="material-icons prefix">vpn_key</i>
            <input
                name='password'
                id='password'
                type='password'
                className='validate'
                minLength='8'
                required
                value={this.state.password}
                onChange={this.onChange}
                placeholder="Password"
              />
          </div>
          <div className='row fieldSign'>
            <div className='col s12 center'>
             <input
                type='submit'
                value='Sign In'
                className='btn waves-effect waves-light'
              />
            </div>
          </div>
        </div>
        </form>
      </div>
    </div>
  </div>
      </div>
    );
  }
}