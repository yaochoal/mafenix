// Dependencies
import React, { Component } from 'react';
import Title from '../Global/Title';
import Loginform from './Loginform'
import Profile from './Profile'

class Login extends Component {
constructor() {
    super();
    this.state = { email: null, password: null, s_users: [], error: "", name: null};
  }

  render() {
      if (localStorage.getItem('jwtToken')) {
        return<div>
          <Profile />
        </div>
    } else {
    return (
       	<div>
      	<Title title='Iniciar sesión'/>
        <div className="register-area" style={{backgroundColor: 'rgb(249, 249, 249)'}}>
        <div className="container">
          <Loginform />
        </div>
      </div>
     	</div>
    )
  }
  }
}

export default Login;
