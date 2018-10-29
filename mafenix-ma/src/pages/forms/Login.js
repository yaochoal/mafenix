import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,Image
} from 'react-native';

import FormLogin from './FormLogin';

import {Actions} from 'react-native-router-flux';

export default class Login extends Component {
    
	signup() {
		Actions.signup()
	}

	render() {
		return(
			<View style={styles.container}>
				<Image  style={{width:"100%", flex:1}}
          			source={require('../../img/logo.png')}/>
				<FormLogin type="Ingresar"/>
				<View style={styles.signupTextCont}>
					<Text style={styles.signupText}>Aún no tienes una cuenta?</Text>
					<TouchableOpacity onPress={this.signup}><Text style={{color:'orange'}}> Registrarte</Text></TouchableOpacity>
				</View>
			</View>	
			)
	}
}

const styles = StyleSheet.create({
  container : {
    backgroundColor:'white',
    flex: 1,
    alignItems:'center',
    justifyContent :'center'
  },
  signupTextCont : {
  	flexGrow: 1,
    alignItems:'flex-end',
    justifyContent :'center',
    paddingVertical:16,
    flexDirection:'row'
  },
  signupText: {
  	color:'grey',
  	fontSize:16
  },
  signupButton: {
  	color:'#ffffff',
  	fontSize:16,
  	fontWeight:'500'
  }
});
