import React from 'react';
import { StyleSheet, View, Image } from 'react-native';

export default class BiciLogo extends React.Component {

	render(){
		return(
			<View style={styles.container}>
				<Image source={require('../images/BiciLogo.png')}></Image>
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
});
