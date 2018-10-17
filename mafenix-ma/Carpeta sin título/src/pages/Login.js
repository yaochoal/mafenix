import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';

import Logo from '../components/Logo';
import Form from '../components/Form';

export default class Login extends React.Component {

	render(){
		return(
			<View style={styles.container}>
				<Logo/>
				<Form/>
				<View style={styles.contactTextCont}>
					<Text style={styles.contactText}>No puedes ingresar?</Text>
					<Text style={styles.contactButton}> Contáctanos...</Text>
				</View>
			</View>

		)
	}
}

const styles = StyleSheet.create({ 
  container: {
    backgroundColor: "#3949ab",
    flex: 1,
    alignItems: "center",
    justifyContent: "center", 
  },
  contactTextCont: {
    flexGrow: 1,
    alignItems: "flex-end",
    justifyContent: "center", 
    paddingVertical: 16, 
    flexDirection: 'row', 	
  },
  contactText: {
  	color: 'rgba(255,255,255,0.7)',
  	fontSize: 14,
  },
  contactButton: {
  	color: '#FFF',
  	fontSize: 14,
  	fontWeight: '400',
  },
  text: {
    color: "#ede7f6",
    fontSize: 18,
  }
});