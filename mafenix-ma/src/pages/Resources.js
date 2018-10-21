import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Picker} from 'react-native';
import { DrawerNavigator, StackNavigator, DrawerItems, SafeAreaView } from 'react-navigation'


export default class Home extends React.Component {
    render() {
        return (
          <View style={styles.container}>
          <Text>Bienvenido a los recursos</Text>
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