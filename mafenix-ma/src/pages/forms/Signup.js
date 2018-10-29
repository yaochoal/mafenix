import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image
} from 'react-native';
import FormSign from './FormSign';

import {Actions} from 'react-native-router-flux';

export default class Signup extends Component{

  goBack() {
      Actions.pop();
  }

	render() {
		return(
			<View style={styles.container}>
				<Image  style={{width:"100%", flex:1}}
          			source={require('../../img/logo.png')}/>
				<FormSign type="Registrarse"/>
				<View style={styles.signupTextCont}>
					<Text style={styles.signupText}>¿Ya tienes una cuenta?</Text>
					<TouchableOpacity onPress={this.goBack}><Text style={{color:'orange'}}> Iniciar sesión</Text></TouchableOpacity>
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
