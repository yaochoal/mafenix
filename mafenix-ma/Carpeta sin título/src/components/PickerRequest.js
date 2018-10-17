import React, { Component } from 'react';
import { View, Text, Picker, StyleSheet } from 'react-native'
import {Header} from './Header.js';
import graphql from '../utils/graphQLUtils';

export default class PickerRequest extends Component {

  constructor(props) {
    super(props);
      this.state = {
        language: "python",
      }
  }
  componentDidMount() {

    var requestPrestamo = `
    mutation {
      createPrestamo(token: "TbPJpoT6Pc", prestamo:{
        bici_id:123
      }) {
        id
        student_id
        bici_id
        solicitud
        entrega
      }
    }
    `;

    graphqlprestamo(  
      request,
      (data) => {
        this.setState({
          isLoading: false,
          dataSource: data.createPrestamo,
        })
      },
      (status, data) => {
      }
    );

  }
   render() {
     
      return (
        
      <View style={styles.container}>
        <Picker
          selectedValue={this.state.language}
          style={{ height: 50, width: 100 }}
          onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
          <Picker.Item label="Java" value="java" />
          <Picker.Item label="JavaScript" value="js" />
        </Picker>
      </View>
      )
   }
}

const styles = StyleSheet.create({
   text: {
      fontSize: 30,
      alignSelf: 'center',
      color: 'red'
   }
})