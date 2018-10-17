// Importaciones
import React from 'react';
import { StyleSheet, Text, View} from 'react-native';

import Header from '../components/Header';

export default class Profile extends React.Component {

  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Header/>
      </View> 
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3949ab',
  },
  text: {
    color: "#ede7f6",
    fontSize: 28,
    marginVertical: 20,
  },
});