import React, { Component } from 'react';
import { StyleSheet,Text,View,TextInput,TouchableOpacity, Alert} from 'react-native';
import graphql from '../utils/graphQLUtils';

export default class Form extends Component {

  constructor(props) {
    super(props);
    this.state = {
        user: '',
        password: '',
    }
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

    // Ejemplo de uso GraphQL
    let auth = `
    query{
      userToken(user:{
        email:"${user}"
        password:"${password}"
      }){
        token
      }
    }
`;


    graphql(auth, function (data) {
        if (data) {
            console.log(data.userToken.token);
            //global.userToken = data.userToken.token;
            //global.userId = data.userToken.id;
            Actions.home();
        }
        else {
            Alert.alert(
                'Error al iniciar sesión',
                'Los datos suministrados no corresponden con ningún usuario registrado',
                [
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                {cancelable: false}
            )
        }
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