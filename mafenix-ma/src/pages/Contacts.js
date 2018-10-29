import React, { Component } from "react";
import { StyleSheet } from 'react-native'
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Item,
  Label,
  Input,
  Body,
  Left,
  Right,
  Icon,
  Form,
  Text,
} from "native-base";

export default class Contact extends Component {
  render() {
    return (
      <Container style={styles.container}>
        <Header androidStatusBarColor='orange' style={{backgroundColor: "white"}}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" style={{color: 'orange'}} />
            </Button>
          </Left>
          <Body>
            <Title style={{color:'grey'}}>Contáctenos</Title>
          </Body>
          <Right />
        </Header>

        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Nombre</Label>
              <Input />
            </Item>
            <Item floatingLabel last>
              <Label>Apellido</Label>
              <Input  />
            </Item>
            <Item floatingLabel last>
              <Label>Email</Label>
              <Input  />
            </Item>
            <Item floatingLabel last>
              <Label>Mensaje</Label>
              <Input  />
            </Item>
          </Form>
          <Button block style={{ margin: 15, marginTop: 50, backgroundColor: 'orange' }}>
            <Text>Enviar</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF"
  }
});
