import React from 'react';
import { StyleSheet, Text, View, Picker, Alert, AsyncStorage} from 'react-native';
import Request_icon from '../components/Request_icon';
import graphql from '../utils/graphQLUtils';
import Button from 'react-native-button';
//import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import {Actions} from 'react-native-router-flux';

export default class Requestbici extends React.Component {
  
  constructor(props, context) {
    super(props, context);
      this.state = {
        origen:"CyT",
        final:"Uriel",
        isDisabled: false,
        user: 105426021,
        origenError: '',
        finalError: '',
        bicicletasOrigen: null
      }

      var request = `
      {
        estacionByName(token: "${userToken}", name: "${this.state.origen}"){
          serial
          marca
          estado
        }
      }`;
  
      graphql(request,
        data => {
          var msg;
          if (!data.estacionByName) {
            msg = "No hay bicicletas disponibles en esta estación"
          }
  
          var bicisDisponibles = []
          data.estacionByName.forEach(bici => {
            if (bici.estado === "Disponible") {
              bicisDisponibles.push(bici)
            }
          })
  
          if (bicisDisponibles.length < 1) {
            msg = "No hay bicicletas disponibles en esta estación"
          }
  
          this.setState({ origenError: msg, bicicletasOrigen: bicisDisponibles })
          console.log(this.state.origenError)
        } 
      ); 
  
  }

  async handleSubmitChange(event) {

    this.componentDidMount()


    Alert.alert(
      'Disfruta tu viaje, tu bicicleta es:',
      'Serial No.:' + this.state.bicicletasOrigen ,
      '' + this.state.origenError,
      '' + this.state.finalError,
      [
        {
          text: 'Aceptar',
        }
      ]
    ) 
      Actions.deliverbici();  
  }  
 
  componentDidMount() {
    const origen = this.state.origen
    const disponibles = this.state.bicicletasOrigen
    console.log(disponibles)
    const final = this.state.final
    console.log("origen dentro de handlePressR")
    console.log(origen)
    console.log(final)

    if (origen === final) {
      this.setState({ finalError: "Cambia las estaciones!" })
      //event.preventDefault();
      return
    }

    if (!disponibles || disponibles.length < 1) {
      this.setState({ finalError: "No hay bicicletas disponibles en esta estación" })
      //event.preventDefault();
      return
    }

    // Apartar bicicleta 

    var requestBici = `
    mutation{
      updateBicicleta(token: "${userToken}", serial: ${disponibles[0].serial}, 
      bicicleta:{
        estado: "Ocupado"
        ubicacion: "${final}"
      }){
        serial
      }
    }`;


    graphql(requestBici,
      data => {
        if (!data.updateBicicleta) {
          this.setState({ finalError: "No hemos podido apartar tu bici D=" })
          event.preventDefault();
        } else {

        }
      }
    )

    if (this.state.finalError || this.state.origenError)
      return;

    // Crear el prestamo

    var request = `
    mutation{
      createPrestamo(token: "${userToken}", prestamo: {
        bici_id: ${disponibles[0].serial}
      }){
        id
        solicitud
      }
    }`;

    graphql(request,
      data => {
        if (!data.createPrestamo) {
          this.setState({ finalError: "Algo ha salido mal con tu prestamo D=" })
          //event.preventDefault();
        } else {

        }
      }
    )
    if (this.state.finalError || this.state.origenError) {
      return
    }
    console.log(this.state.finalError)
  } 
 
  render() {
    //console.log(this.state)
    return (
    <View style={styles.container}>
      <Request_icon/>
      <Text style={styles.text}>Seleccione su Estación de Inicio</Text>
      <Picker 
        selectedValue={this.state.origen}
        style={styles.picker}
        underlineColorAndroid='rgba(0,0,0,0)'
        onValueChange={(itemValue, itemIndex) => this.setState({origen: itemValue})} >        
        <Picker.Item label="CyT" value="Edificio CyT" />
        <Picker.Item label="Central" value="Biblioteca Central" />
        <Picker.Item label="Uriel" value="Entrada Edificio Uriel Gutierrez" />
        <Picker.Item label="Estadio" value="Estadio" />
        <Picker.Item label="Capilla" value="Capilla" />
        <Picker.Item label="Humanas" value="Facultad de Humanas" />
      </Picker>

      <Text style={styles.text}>Seleccione su Estación de Destino</Text>
      <Picker
        selectedValue={this.state.final}
        style={ styles.picker}
        onValueChange={(itemValue, itemIndex) => this.setState({final: itemValue})}>
        <Picker.Item label="Central" value="Central" />
        <Picker.Item label="Uriel" value="Uriel" />
        <Picker.Item label="CyT" value="CyT" />
        <Picker.Item label="Estadio" value="Estadio" />
        <Picker.Item label="Capilla" value="Capilla" />
        <Picker.Item label="Humanas" value="Humanas" />
      </Picker>
      <Text></Text>
      <Button
        style={{ flex: 3,fontSize: 18, color: 'white' }}
        styleDisabled={{ color: 'white' }}
        containerStyle={{ padding: 8, height: 45, width: 150, overflow: 'hidden', borderRadius: 10, 
          borderWidth: 1, borderColor: '#fff', backgroundColor: '#06A800' }}
        disabledContainerStyle={{ backgroundColor: '#db143f' }}
        onPress={() => this.handleSubmitChange()}>Solicitar Bici
      </Button>
    </View>
    );
  }
}

class componentPageRequestbici extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      prestamos: []
    }
  }

  componentDidMount(){
    
    var request = `
    {
      prestamosbyUser(token: "${userToken}"){
        id
      }
    }`;

    graphql(request,
      data => {
        if (!data.prestamosbyUser) {
          return;
        }
        this.setState({ prestamos: data.prestamosbyUser }) // Sin prestamos
      }
    )
  }

  render() {

    if (!this.props.isAuthenticated){
      //return <Redirect to="/" />;      
      return Actions.home();
    }
    if(this.state.prestamos.length > 0){
      //return <Redirect to="/timer" />;
      return Actions.deliver();
    }

    return (
    <View style={styles.container}>
      <Request_icon/>
        <Requestbici user={userToken} />
      <Text></Text>
    </View>
    );
  }
}
// const PageRequestbici = connect(
//   state => ({
//     isAuthenticated: state.authReducers.isAuthenticated,
//     user: state.authReducers.user,
//   })
// )(ComponentPageRequestbici)



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