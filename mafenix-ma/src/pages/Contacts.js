import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Picker, Button} from 'react-native';
import t from 'tcomb-form-native';
import {client} from '../utils/graphQLUtils';
import gql from "graphql-tag";
const Form = t.form.Form;

const UserContact = t.struct({
  nombre: t.String,
  apellido: t.String,
  correo: t.String,
  mensaje: t.String
});

export default class App extends React.Component {
  handleSubmit = () => {
    const value = this._form.getValue();
    
       console.log('value: ',value );
        //console.log(this._form.getComponent('nombre'));

        client.mutate({
          mutation: gql`
          mutation{
              createContact(contact:{
                name :"Nombre"
                lastName:"Apellido"
                message:"Mensaje"
                email: "Correo"
              })
            }`
        })
        .then(data => {
          //console.log(data)
        })
        .catch(error => console.error(error));
      }
  }


  render() {
    return (
      <View style={styles.container}>
      <Text>Bienvenido al Contactenos</Text>
        <Form  ref={c => this._form = c} type={UserContact} />
        <Button
          title="Enviar"
          onPress={this.handleSubmit}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //alignItems: 'center',
    padding: 20,
    justifyContent: 'center',
  },
});