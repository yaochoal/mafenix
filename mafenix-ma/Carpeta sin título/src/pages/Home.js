import React from 'react';
import Button from 'react-native-button';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Picker} from 'react-native';

import BiciLogo from '../components/BiciLogo';

import {Actions} from 'react-native-router-flux';


export default class Home extends React.Component {

  constructor(props, context) {
    super(props, context);
      this.state = {
        isDisabled: false,
        user: 105426021
      }
  }

  _handlePress() {
    this.requestbici();
    console.log('Boton Solicitar, funcionando');
    
  }  

  _handlePress1() {
    console.log('Boton Perfil funcionando');
    this.profile();
  }

   _handlePress2() {
    console.log('Boton Historial funcionando');
    this.records();
  }

  profile() {
    Actions.profile();  
  }

  records() {
    Actions.records();  
  }

  requestbici(){
    Actions.requestbici();
  }
  deliverbici(){
    Actions.deliverbici();
  }

  render() {
    const { isDisabled } = this.state;
    return (
        <View style={styles.container}>
          <BiciLogo/>
        
          <Picker/>
        
          <Button
            style={{ fontSize: 20, color: 'white' }}
            styleDisabled={{ color: 'white' }}
            disabled={isDisabled}
            containerStyle={{ padding: 8, height: 45, width: 380, overflow: 'hidden', borderRadius: 10, 
              borderWidth: 1, borderColor: '#fff', backgroundColor: '#06A800' }}
            disabledContainerStyle={{ backgroundColor: '#db143f' }}
            onPress={() => this._handlePress()}
            >Solicitar
          </Button>

          <Text></Text>
          <Text style={styles.text1}>Consulta la información de tu perfil</Text>

          <Button
            style={{fontSize: 20, color: '#fff'}}
            containerStyle={{ padding: 8, height: 45, width: 380, overflow: 'hidden', 
              borderRadius: 10, borderWidth: 1, borderColor: '#fff', backgroundColor: '#00227b' }}
            onPress={() => this._handlePress1()}>
            Perfil
          </Button>

          <Text></Text>
          <Text style={styles.text1}>Consulta el historial de tus prestamos.</Text>          

          <Button
            style={{fontSize: 20, color: '#fff'}}
            containerStyle={{ padding: 8, height: 45, width: 380, overflow: 'hidden', 
              borderRadius: 10, borderWidth: 1, borderColor: '#fff', backgroundColor: '#00227b' }}
            onPress={() => this._handlePress2()}>
            Historial
          </Button>

        </View>  
    );
  }
}

const styles = StyleSheet.create({

  container: {
    backgroundColor: "#3949ab",
    flex: 1,
    alignItems: "center",
    justifyContent: "center", 
  },

  text1: {
    color: "#3949ab",
    fontSize: 8,
  },

  button: {
    width: 300,
    backgroundColor: '#00227b',
    borderRadius: 8,
    marginVertical: 8,
    paddingVertical: 6,

  },
});