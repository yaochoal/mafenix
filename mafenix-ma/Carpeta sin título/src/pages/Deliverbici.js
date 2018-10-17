import React from 'react';
import { StyleSheet, Text, View, Picker, Alert, AsyncStorage} from 'react-native';
import Request_icon from '../components/Request_icon';
import graphql from '../utils/graphQLUtils';
import Button from 'react-native-button';
import { connect } from 'react-redux'

import {Actions} from 'react-native-router-flux';

class Deliverbici extends React.Component {
  constructor(props) {
      super(props)
      this.state = {
        perfil: null,
        idPres: null,
        idPresError: '',
        bikes: null
      }  
    
  }

  async handleSubmit(){
      //event.preventDefault();


      Actions.home();
      console.log("submit data")
      const bicis = this.state.bikes;

      let requestPendientes = `
      query{
          prestamosPendientes(token: "${userToken}"){
            bici_id
            student_id
            id
            entrega
          }
      }`;

      graphql(requestPendientes,
          data => {
              var msg;
              if (!data.prestamosPendientes) {
                  msg = "No hay pendientes"
                  console.log(msg)
              }

              var bicisPen = []
              bicisPen = data.prestamosPendientes;
              this.setState({ idPresError: msg, bikes: bicisPen })
              
          }
          
      );

      

      let requestEntregar = `
      mutation{
          entregarPrestamo(token: "${userToken}", id:${bicis[0].id}){
          bici_id
          }
      }`;
          
      graphql(requestEntregar,
          data => {
          console.log(data.entregarPrestamo.bici_id)
          }
      );
  }
  render() {
    return (
    <View style={styles.container}>
    
      <Text style={styles.text}>Esperamos hayas disfrutado nuestro servicio</Text>

      <Text style={styles.text}>Recuerda no exceder el tiempo de tu prestamo. </Text>
      <Text style={styles.text}>El servicio es para todos.</Text>
      <Button
        style={{ flex: 3,fontSize: 18, color: 'white' }}
        styleDisabled={{ color: 'white' }}
        containerStyle={{ padding: 8, height: 45, width: 150, overflow: 'hidden', borderRadius: 10, 
          borderWidth: 1, borderColor: '#fff', backgroundColor: '#06A800' }}
        disabledContainerStyle={{ backgroundColor: '#db143f' }}
        onPress={() => this.handleSubmit()}>Entregar Bici
      </Button>
    </View>  
    );
  }
}
class ComponentDeliverbici extends React.Component{

  constructor(props) {
      super(props)
      this.state = {
        perfil: null,
      }  
    
  }

  render() {
      if(!this.props.isAuthenticated)
        return Actions.home();
      return (
          <Deliverbici user={userToken}/>
              
      );
    }

}

// const Deliverbici = connect(
//   state => ({
//     isAuthenticated: state.authReducers.isAuthenticated,
//     user: state.authReducers.user,
//   })
// )(ComponentDeliverbici)

export default Deliverbici;


const styles = StyleSheet.create({

  container: {
    backgroundColor: "#3949ab",
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center", 
  },

  text: {
    color: "#fff",
    fontSize: 14,
    marginVertical: 8,
  },
  picker:{
    height: 30,
    width:300,
    color:'#fff',
    borderRadius: 10, 
    borderWidth: 1, 
    borderColor: '#fff', 
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 10
  }
});