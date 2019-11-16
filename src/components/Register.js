import React, { Component } from 'react';
import axios from 'axios';
import '../styles/register.css'


export default class SignUp extends Component {
  state = {
    login: '',
    password: '',
    phone: '',
    email: ''
  };
  onChange = ({ target }) => {
    this.setState({
      [target.name]: target.value
    });
  };
  createUser = async user => {
    try {
      await axios.post('http://localhost:5000/user/register', user);
    } catch (err) {
      console.log("Ошибка:" + err);
    }
  };
  onSubmit = e => {
    e.preventDefault();
    this.createUser(this.state);

    this.setState({
      login: '',
      password: '',
      phone: '',
      email: ''
    });
  };
  render() {
    return (
      <div className="center signImg">
      <div className='container regist'>
        <div className='row z-depth-4 windowRegist'>
          <div className='col s12'>
            <h4 className='center titleSign'>Create an account</h4>
            <form className='col s12' onSubmit={this.onSubmit}>
            <div className="row"> 
              <div className="input-field col s12 fieldSign">
                <i className="material-icons prefix">account_circle</i>
                <input
                    name='login'
                    id='login'
                    type='text'
                    className='validate'
                    required
                    value={this.state.login}
                    onChange={this.onChange}
                    placeholder="login"
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
                    placeholder="password"
                  />
              </div>
              <div className="input-field col s12 fieldSign">
                <i className="material-icons prefix">phone</i>
                <input
                    name='phone'
                    id='icon_telephone'
                    type='tel'
                    className='validate'
                    required
                    value={this.state.phone}
                    onChange={this.onChange}
                    placeholder="Phone"
                  />
              </div>
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
              <div className='row fieldSign'>
                <div className='col s12 center'>
                  <input
                    type='submit'
                    value='Sign Up'
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