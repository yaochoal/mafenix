import React, { Component } from 'react';
import { StyleSheet,Text,View,TextInput,TouchableOpacity, Alert} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {client} from '../utils/graphQLUtils';
import gql from "graphql-tag";

export default class Form extends Component {

  constructor(props) {
    super(props);
    this.state = {
        user: '',
        password: '',
    }
}
home() {
    Actions.home()
}

handleSubmit(event) {

    const user = this.state.user;
    const password = this.state.password;
    let error = true;

    if (!user || user.length < 1 || !password || password.length < 1) {
        Alert.alert(
            'Los datos no pueden estar vacíos',
            'Por favor ingrese usuario y contraseña',
            [
                {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            {cancelable: false}
        )
    }

    client.query({
        query: gql`
        query{
            userToken(user:{
              email:"${user}"
              password:"${password}"
            }){
              token
            }
          }
          `
      })
      .then(data => {
          console.log(data)
            client.query({
                query: gql`
                query{
                    userInfo(token:{
                      token:"${data.data.userToken.token}"
                    }){
                      name
                      id
                      email
                      avatar
                    }
                  }
                `
            })
            .then(data1 => {
                //console.log(data1.userInfo);
                global.userData= data1.data.userInfo;
                console.log("datos");
                console.log(global.userData)
                Actions.home();
            })
            .catch(error => {
                console.log(error)
                Alert.alert(
                    'Error al iniciar sesión',
                    'Error decodificando token',
                    [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                    {cancelable: false}
                )
            });
      })
      .catch(error => {
          console.log(error);
          Alert.alert(
            'Error al iniciar sesión',
            'Los datos suministrados no corresponden con ningún usuario registrado',
            [
                {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            {cancelable: false}
        )
        });

}



	render(){
		return(
			<View style={styles.container}>
          <TextInput style={styles.inputBox} 
              underlineColorAndroid='rgba(0,0,0,0)' 
              placeholder="Email"
              placeholderTextColor = "#ffffff"
              selectionColor="#fff"
              keyboardType="email-address"
              onSubmitEditing={(event) => {
                        this.refs.password.focus();
                    }}
                    onChangeText={(user) => this.setState({user})}
              returnKeyType={"next"}
              />
          <TextInput style={styles.inputBox} 
              ref='password'
              style={styles.inputBox}
              underlineColorAndroid='rgba(0,0,0,0)' 
              placeholder="Contraseña"
              secureTextEntry={true}
              placeholderTextColor = "#ffffff"
              onChangeText={(password) => this.setState({password})}
              />  
           <TouchableOpacity onPress={this.handleSubmit.bind(this)} style={styles.button}>
             <Text style={styles.buttonText}>{this.props.type}</Text>
           </TouchableOpacity>     
  		</View>
			)
  }
  aceptar() {
    console.log("Login Incorrecto");
}
}

const styles = StyleSheet.create({
  container : {
    flexGrow: 1,
    justifyContent:'center',
    alignItems: 'center'
  },

  inputBox: {
    width:300,
    backgroundColor:'rgba(255, 255,255,0.2)',
    borderRadius: 25,
    paddingHorizontal:16,
    fontSize:16,
    color:'#ffffff',
    marginVertical: 10
  },
  button: {
    width:300,
    backgroundColor:'#1c313a',
     borderRadius: 25,
      marginVertical: 10,
      paddingVertical: 13
  },
  buttonText: {
    fontSize:16,
    fontWeight:'500',
    color:'#ffffff',
    textAlign:'center'
  }
  
});