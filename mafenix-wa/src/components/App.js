// Dependencies
import React, { Component } from 'react';


// Components
import Header from './Global/Header';
import Content from './Global/Content';
import Footer from './Global/Footer';
// Data
import items from '../data/menu';
import store from '../store';
import { obtenerDatos } from './Login/obtenerDatos';
import { initGA } from '../analytics';


class App extends Component {

constructor() {
    super()
    this.state = {  s_users: []}
    initGA();
   
  }
 
  componentWillMount(){
     if (localStorage.getItem('jwtToken')) {
      obtenerDatos(localStorage.getItem('jwtToken')).then((users) => {
        this.setState({ s_users: users })
      })
    }
  }

  render() {  
    //console.log(store.getState().aut )
    if (localStorage.getItem('jwtToken')) {
    store.dispatch({
         type: "ADD_TO_STORE",
         id: this.state.s_users.id,
         username: this.state.s_users.username,
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
