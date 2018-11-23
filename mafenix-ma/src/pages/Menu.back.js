import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from "react-native";
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/Foundation';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon4 from 'react-native-vector-icons/MaterialIcons';
import Home from './Home';
import Courses from './Courses';
import Teachers from './Teachers';
import Resources from './Resources';
import Contacts from './Contacts';



class Menu extends React.Component {
    render() {
        return (
          <View style={styles.container}>         
          <Text >Hello that</Text>
          </View>
        );
      }
    
}

export default createMaterialBottomTabNavigator({
  Inicio: {screen: Home,navigationOptions:{tabBarIcon:({tintColor})=>(<Icon name= "ios-home" color={tintColor} size={24}/>) }},
  Materias: {screen: Courses,navigationOptions:{tabBarIcon:({tintColor})=>(<Icon1 name= "open-book" color={tintColor} size={24}/>) }},
  Docentes: {screen: Teachers,navigationOptions:{tabBarIcon:({tintColor})=>(<Icon2 name= "social-myspace" color={tintColor} size={24}/>) }},
  Recursos: {screen: Resources,navigationOptions:{tabBarIcon:({tintColor})=>(<Icon3 name= "file-document" color={tintColor} size={24}/>) }},
  Contacto: {screen: Contacts,navigationOptions:{tabBarIcon:({tintColor})=>(<Icon4 name= "contact-mail" color={tintColor} size={24}/>) }},
  Perfil: {screen: Contacts,navigationOptions:{tabBarIcon:({tintColor})=>(<Icon3 name= "face" color={tintColor} size={24}/>) }}
},{
  initialRouteName: 'Inicio',
  order: ['Inicio','Materias','Docentes', 'Recursos', 'Contacto', 'Perfil'],
  activeTintColor: 'orange',
  inactiveTintColor: 'grey',
  barStyle: { backgroundColor: 'white' },
  shifting: true
});
const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems:'center',
    justifyContent:'center',
  }
});
