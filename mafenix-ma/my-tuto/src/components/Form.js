import React from 'react';
import {StyleSheet, Text, View, TextInput, TouchableOpacity, Alert} from 'react-native';
import {Actions} from 'react-native-router-flux';
import graphql from '../utils/graphQLUtils';

export default class Form extends React.Component {

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
        let auth = `mutation {
        auth(auth:{
                id: "${user}",
                password: "${password}"
            }) {
                token
                expire
            }
        }`;


        graphql(auth, function (data) {
            if (data) {
                console.log(data.auth.token);
                global.userToken = data.auth.token;
                global.userId = user;
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

    render() {
        return (

            <View style={styles.container}>
                <TextInput
                    style={styles.inputBox}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    placeholder='Usuario'
                    placeholderTextColor='#FFFFFF'
                    selectionColor="#fff"
                    onSubmitEditing={(event) => {
                        this.refs.password.focus();
                    }}
                    onChangeText={(user) => this.setState({user})}
                    returnKeyType={"next"}
                />

                <TextInput
                    ref='password'
                    style={styles.inputBox}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    placeholder='Contraseña'
                    selectionColor="#fff"
                    secureTextEntry={true}
                    placeholderTextColor='#FFFFFF'
                    onChangeText={(password) => this.setState({password})}/>

                <TouchableOpacity onPress={this.handleSubmit.bind(this)} style={styles.button}>
                    <Text style={styles.buttonText}>Ingresar</Text>
                </TouchableOpacity>
            </View>
        )
    }

    /*
      <Text style={styles.buttonText} onPress={(this.onLogin.bind(this))}>Ingresar</Text>
    */

    /*
    onLogin() {
      console.log("Boton ingresar presionado");
      Alert.alert(
        'Login',
        'Datos incorrectos, intente de nuevo.',
        [
          {
            text: 'Aceptar',
            onPress: (this.aceptar.bind(this))
          }
        ]
      )

    }
    */

    aceptar() {
        console.log("Login Incorrecto");
    }
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputBox: {
        width: 300,
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 8,
        paddingHorizontal: 10,
        fontSize: 14,
        color: '#FFFFFF',
        marginVertical: 8,
    },
    button: {
        width: 300,
        backgroundColor: '#00227b',
        borderRadius: 8,
        marginVertical: 8,
        paddingVertical: 6,

    },
    buttonText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#FFFFFF',
        textAlign: 'center',
    }
});
