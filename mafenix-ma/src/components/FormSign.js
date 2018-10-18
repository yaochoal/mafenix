import React, { Component } from 'react';
import { StyleSheet,Text,View,TextInput,TouchableOpacity, Alert} from 'react-native';
import {Actions} from 'react-native-router-flux';
import GraphQLRequest from '../utils/graphQLUtils';
import ApolloClient from 'apollo-boost';
import gql from "graphql-tag";
import {client} from '../utils/graphQLUtils';

export default class Form extends Component {

  constructor(props) {
    super(props);
    this.state = {
        user: '',
        password: '',
        name: ''
    }
}
home() {
    Actions.home()
}

handleSubmit(event) {
    const name = this.state.name
    const user = this.state.user;
    const password = this.state.password;
    let error = true;

    if (!user || user.length < 1 || !password || password.length < 1 || !name || user.length < 1) {
        Alert.alert(
            'Los datos no pueden estar vacíos',
            'Por favor ingrese usuario y contraseña',
            [
                {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            {cancelable: false}
        )
    }
   
    // Ejemplo de uso GraphQL
    client.mutate({
        mutation: gql`
        mutation{
          createUser(user:{
            name:"${this.state.name}"
            password:"${this.state.password}"
            email:"${this.state.user}"
            avatar:"https://robohash.org/quasiquianihil.png?size=300x300&set=set1"
          }){
            name
          }
        }`
      }).then(data => {
                Alert.alert(
                    'Registrado Exitosamente',
                    `Bienvenido a MAFENIX ${this.state.name}`,
                    [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                    {cancelable: false}
                    
                );
        Actions.login();
      })
      .catch(error => {
          console.error(error);
          Alert.alert(
            'Ha ocurrido un error Registrandote, Intentalo mas tarde...',
            [
                {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            {cancelable: false}
            );
        });
}



	render(){
		return(
			<View style={styles.container}>
           <TextInput style={styles.inputBox} 
              underlineColorAndroid='rgba(0,0,0,0)' 
              placeholder="Nombre"
              placeholderTextColor = "#ffffff"
              selectionColor="#fff"
              onSubmitEditing={(event) => {
                        this.refs.password.focus();
                    }}
                    onChangeText={(name) => this.setState({name})}
              returnKeyType={"next"}
              />

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
    console.log("Registro Incorrecto");
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