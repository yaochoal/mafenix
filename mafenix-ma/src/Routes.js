import React, { Component } from 'react';
import {Router, Stack, Scene} from 'react-native-router-flux';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home'
export default class Routes extends Component {
	render() {
		return(
			<Router>
			    <Stack key="root" hideNavBar={true}>
			      <Scene key="login" component={Login} title="Iniciar sesión" initial={true}/>
						<Scene key="home" component={Home} title="Inicio" />
			      <Scene key="signup" component={Signup} title="Registro"/>
			    </Stack>
			 </Router>
			)
	}
}