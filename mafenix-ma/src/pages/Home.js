import React from 'react';
import {Picker,Image,View, TextInput } from 'react-native';
import { Container
  , Header
 , Body } from 'native-base';
  const Logo = require("../img/logo.png");
  const Fondo = require("../img/slider1.jpg");
export default class Home extends React.Component {
  
    render() {
        return (
          <Container >
        <Header androidStatusBarColor='orange' style={{backgroundColor: "white",height:115}}>
          <Body>
          <Image source={Logo} style={{ width: "100%", flex: 1}}/>
          </Body>
        </Header>
        <View style={{flex:1}}>
          <Image style={{ width: "100%", height: "100%", position: 'absolute', top: 0, left: 0 }}source={Fondo}/>
          <View style={{flex:1, paddingTop:180}}>
          <TextInput  style={{width:"100%",padding:15,borderColor:"orange",backgroundColor:'white'}}
          placeholder="Buscar..."/>
          <Picker style={{width:"100%",padding:15,borderColor:"orange",backgroundColor:'white'}}>
            <Picker.Item value="teachers" label="Docentes"/>
            <Picker.Item value="courses" label="Materias"/>
            <Picker.Item value="resources" label="Recursos"/>
          </Picker>
          </View>
       </View> 
      </Container>
        );
      }
    
}

