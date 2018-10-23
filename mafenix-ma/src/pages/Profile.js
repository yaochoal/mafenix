import { Container, Header, Title, Image, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';

import React from 'react';
import image from "./perfil.jpg"
import { client } from '../utils/graphQLUtils';
import gql from "graphql-tag";
import { View, FlatList, ActivityIndicator, StyleSheet, TextInput } from "react-native";
import { FormLabel, FormInput, FormValidationMessage, Avatar } from 'react-native-elements'

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          loading: false,
          data: [],
          page: 1,
          error: null,
          refreshing: false
        };
        console.log("***********************profile*********", global.userData);
      }
      
      componentDidMount() {
        console.log("profile*********", global.userData);
        
      }
    
    render() {
        return (
            
            <Container >
                <Header>
                    <Left>
                        <Button transparent>
                            <Icon name='menu' />
                        </Button>
                    </Left>
                    <Body  style = {styles.title}>
                        <Title >MI PERFIL</Title>
                    </Body>
                    <Right />
                </Header>
                <Content  >
                <View style = {styles.container}>
                <Image source={{uri: "https://robohash.org/quasiquianihil.png?size=300x300&set=set1"}}
       style={{width: 400, height: 400}} />

                    <Text>
                        Nombre:  {global.userData.name}
                        Correo:  {global.userData.email}
                    </Text>
                    </View>
                </Content>

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
    title: {
        fontWeight: "500",
        alignSelf: 'center',
    }
});

