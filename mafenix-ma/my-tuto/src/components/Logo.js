import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default class Logo extends React.Component {

	render(){
		return(
			<View style={styles.container}>
				<Image source={require('../images/Logo.png')}></Image>
				<Text style={styles.logoText}>Bienvenido a BiciUN</Text>
			</View>	
		)
	}
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  logoText: {
  	marginVertical: 6,
    color: "#ede7f6",
    fontSize: 18,
    textAlign: 'center',
  },
});
