// Dependencies
import React, { Component } from 'react';


// Components
import Header from './Global/Header';
import Content from './Global/Content';
import Footer from './Global/Footer';
// Data
import items from '../data/menu';
import store from '../store';
import { initGA } from '../analytics';
//graphiql
import ApolloClient from 'apollo-boost';
import gql from "graphql-tag";
const client = new ApolloClient({
  uri: "http://192.168.99.101:5500/graphql"
});


class App extends Component {

constructor() {
    super()
    this.state = {  s_users: []}
    initGA();
   
  }
 
  componentWillMount(){
     if (localStorage.getItem('jwtToken')) {
      client.query({
        query: gql`
        query{
          userInfo(token:{
            token:"${localStorage.getItem('jwtToken')}"
          }){
            name
            id
            email
            avatar
          }
        }
        `
      })
      .then(data => {
        //console.log(data.data.userInfo)
        this.setState({s_users: data.data.userInfo});
      })
      .catch(error => {console.error(error)
});
    }
  }

  render() {  
    //console.log(store.getState().aut )
    if (localStorage.getItem('jwtToken')) {
    store.dispatch({
         type: "ADD_TO_STORE",
         id: this.state.s_users.id,
         username: this.state.s_users.name,
         email: this.state.s_users.email,
         avatar: this.state.s_users.avatar,
         career_id: this.state.s_users.career_id,
         aut: true
     })}
   // const { children } = this.props;
   //<Content body={children} />
    return (
      
      <div >
        <Header items={items}/>
        <Content/>
        <Footer items={items}/>
      </div>

    );
  }
}

export default App;
