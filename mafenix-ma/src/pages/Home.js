import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { Container, Icon, Header, Left } from 'native-base';

export default class Home extends React.Component {
    render() {
        return (
          <Container>
            <View style={styles.container}>
            <Text>Bienvenido al Home</Text>
           </View>
          </Container>
          
          
        );
      }
    
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});