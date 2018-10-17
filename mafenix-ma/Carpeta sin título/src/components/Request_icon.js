import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default class Request_icon extends React.Component {

	render(){
		return(
			<View style={styles.container}>
				<Image source={require('../images/Request_icon.png')}></Image>
				<Text style={styles.Request_iconText}>Inicia tu viaje</Text>
			</View>	
		)
	}
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  Request_iconText: {
  	marginVertical: 10,
    color: "#ede7f6",
    fontSize: 18,
    textAlign: 'center',
  },
});
