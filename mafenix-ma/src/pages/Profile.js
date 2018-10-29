import React, { Component } from 'react';
import {Router, Stack, Scene} from 'react-native-router-flux';
import Login from './forms/Login';
import Signup from './forms/Signup';
import Profile from './forms/Profile';
export default class Routes extends Component {
	render() {
		return(
			<Router>
			    <Stack key="root" hideNavBar={true}>
			      <Scene key="login" component={Login} title="Iniciar sesión" initial={true} />
			      <Scene key="signup" component={Signup} title="Registro"/>
           		 <Scene key="profile" component={Profile} title="Profile"/>
			    </Stack>
			 </Router>
      )
 
	}
}