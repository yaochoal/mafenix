import React from 'react';
import {Router, Stack, Scene} from 'react-native-router-flux';

import Login from './pages/Login';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Records from './pages/Records';
import Requestbici from './pages/Requestbici';
import Deliverbici from './pages/Deliverbici';

export default class Routes extends React.Component {
	render() {
		return(
			<Router>
    			<Stack key="root" hideNavBar={true}>
      				<Scene key="login" component={Login} title="Login" initial={true}/>
      				<Scene key="home" component={Home} title="Home"/>
      				<Scene key="profile" component={Profile} title="Profile"/>
      				<Scene key="records" component={Records} title="Records"/>
      				<Scene key="requestbici" component={Requestbici} title="Requestbici"/>
      				<Scene key="deliverbici" component={Deliverbici} title="Deliverbici"/>
    			</Stack>
  			</Router>
		)
	}   
}