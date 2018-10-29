import React, { Component } from 'react';
import {Router, Stack, Scene} from 'react-native-router-flux';
import {Course} from './src/pages/Courses';
import {Teacher} from './src/pages/Teachers';
import Menu from './src/pages/Menu';
import Signup from './src/pages/forms/Signup';
import Login from './src/pages/forms/Login';
import Profile from './src/pages/forms/Profile';
export default class Routes extends Component {
	render() {
		return(
			<Router>
			    <Stack key="root" hideNavBar={true}>
                    <Scene key="Menu" component={Menu} title="Menu"/>
                    <Scene key="Course" component={Course} title="Curso" />
                    <Scene key="Teacher" component={Teacher} title="Docente"/>
                    <Scene key="signup" component={Signup} title="Registro"/>
                    <Scene key="login" component={Login} title="Inicio de sesion" initial={true} />
                    <Scene key="profile" component={Profile} title="Profile"/>
			    </Stack>
			 </Router>
      )
 
	}
}