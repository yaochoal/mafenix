import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image
} from "react-native";

//library imports 
import { Container, Content, Icon, Header, Body } from 'native-base'
import { createDrawerNavigator, StackNavigator, DrawerItems, SafeAreaView } from 'react-navigation'
import Home from './Home';
import Courses from './Courses';
import Teachers from './Teachers';
import Resources from './Resources';
import Contacts from './Contacts';


const CustomDrawerContentComponent = (props) => (

  <Container>
    <Header style={styles.drawerHeader}>
      <Body>
        <Text>Bienvenido a MAFENIX</Text>
        <Image
          style={styles.drawerImage}
          source={require(`./Logo.png`)} />
          
        <Text>Usuario: Nombre de usuario</Text>
      </Body>
    </Header>
    <Content>
      <DrawerItems {...props} />
    </Content>

  </Container>

);

export default class App extends React.Component {
    render() {
        return (
          <MyApp/>
        );
      }
    
}



const MyApp = createDrawerNavigator({

  // For each screen that you can navigate to, create a new entry like this:
  /*
  Inicio: {
    screen: Home,
  },*/
  Materias: {
    screen: Courses
  },
  Docentes: {
    screen: Teachers
  },
  Recursos: {
    screen: Resources
  },
  Contáctenos: {
    screen: Contacts
  }},{initialRouteName: 'Materias',
  drawerPosition: 'left',
  contentComponent: CustomDrawerContentComponent,
  drawerOpenRoute: 'DrawerOpen',
  drawerCloseRoute: 'DrawerClose',
  drawerToggleRoute: 'DrawerToggle'}
)

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  drawerHeader: {
    height: 200,
    backgroundColor: 'white'
  },
  drawerImage: {
    height: 150,
    width: 150,
    borderRadius: 75
  }

})