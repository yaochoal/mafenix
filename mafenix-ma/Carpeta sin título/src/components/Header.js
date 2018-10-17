// Importaciones
import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import graphql from '../utils/graphQLUtils';



global.userToken = "InrHZA4SgT";

export default class Header extends React.Component {

  constructor(props) {
    super(props);
      this.state = {
        isLoading: true,
      }
  }

  componentDidMount() {
    var request = `query {
      userById(token: "${userToken}") {
        name
        lastname
        email
        id
      }
    }`;

    graphql(
      request,
      (data) => {
        this.setState({
          isLoading: false,
          dataSource: data.userById,
        })
      },
      (status, data) => {
      }
    );
    
  }

    render() {

        console.log(this.state);

        if (this.state.isLoading) {
            return (

                <View style={styles.header}>
                    <Text style={styles.lastname}>Cargando</Text>
                </View>


            );
        }

        return (
            <View style={styles.header}>

                <Text style={styles.text}> Perfil de Usuario</Text>

                <View style={styles.profilePhotoS}>
                    <Image style={styles.profilePhoto} source={{uri: this.state.photoUrl}}/>
                </View>

                <Text style={styles.lastname}>{this.state.dataSource.lastname}</Text>
                <Text style={styles.name}>{this.state.dataSource.name}</Text>
                <Text style={styles.email}>{this.state.dataSource.email}</Text>

            </View>
        );
    }
}

const styles = StyleSheet.create({

    headerBackground: {},

    header: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#3949ab',
    },

    profilePhotoS: {
        width: 250,
        height: 250,
        borderRadius: 180,
        borderColor: '#fff',
        borderWidth: 4,
    },

    profilePhoto: {
        flex: 1,
        width: null,
        alignSelf: 'stretch',
        borderRadius: 180,
        borderColor: 'black',
        borderWidth: 4,
    },

    text: {
        color: "#ede7f6",
        fontSize: 25,
        marginVertical: 20,
    },

    lastname: {
        marginTop: 20,
        fontSize: 18,
        color: '#FFF',
        fontWeight: 'bold',
    },

    name: {
        fontSize: 16,
        color: '#FFF',
        fontWeight: '300',
    },

    email: {
        fontSize: 13,
        color: '#FFF',
        fontWeight: '300',
        fontStyle: 'italic',

    }
});
