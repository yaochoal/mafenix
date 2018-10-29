import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import {Thumbnail} from 'native-base';
import store from '../../../store'
export default class Profile extends React.Component {
    render() {
        return (
          <View style={styles.container}>
          <Thumbnail large source={{uri:`${store.getState().avatar}`}} />
          <Text>Bienvenido {store.getState().username}</Text>
          <Text>Correo: {store.getState().email}</Text>
          <Text>Correo: {store.getState().id}</Text>
          </View>
        );
      }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});