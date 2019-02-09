// Dependencies
//https://developers.facebook.com/apps/
//https://console.developers.google.com/?pli=1
//HTTPS=true npm start
//https://apps.twitter.com/
//https://console.firebase.google.com/project/mafe-app/overview
import React, { Component } from 'react';
//import { pPost } from './obtenerDatos';
import swal from 'sweetalert2'
import { logPageView } from '../../analytics';

//graphiql
import ApolloClient from 'apollo-boost';
import gql from "graphql-tag";
import baseURL from "../../url"
const client = new ApolloClient({
  uri: `${baseURL}`
});

class Loginform extends Component {
constructor() {
    super();
    this.state = { email: null, password: null, s_users: [], error: null};
    logPageView();
  }

 
  
 setField (e) {
  if(e.target.id === 'email'){
    this.setState({
      email: e.target.value
    })
    }
    if(e.target.id === 'password'){
    this.setState({
      password: e.target.value
    })
    }
  }


handleSubmit = (e) =>{
     e.preventDefault()
     this.setState({error: null});
     client.query({
      query: gql`
      query{
        userToken(user:{
          email:"${this.state.email}"
          password:"${this.state.password}"
        }){
          token
        }
      }
      `
    })
    .then(data => {
      console.log(data.data.userToken.token)
      localStorage.setItem("jwtToken", data.data.userToken.token)
      if(this.state.error === null){
        setTimeout(function(){document.location.reload()},1000);
        swal({
          title:'Cargando...',
          text:'',
          timer:1000,
          onOpen: () =>{
            swal.showLoading()
          }
        })
        }
    })
    .catch(error => {console.error(error)
      this.setState({error: "Email o contraseña incorrecta"})});
  }






  render() {
     return(<div>
          <div className="col-md-6">
            <div className="box-for overflow">                         
              <div className="col-md-12 col-xs-12 login-blocks">
                <h2>Iniciar sesión : </h2> 
                <form>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="text" onChange={(e)=>this.setField(e)} className="form-control" id="email" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" onChange={(e)=>this.setField(e)} className="form-control" id="password" />
                  </div>
                  <p style={{color: 'red'}}>{this.state.error}</p>
                  <div className="text-center">
                   
                    <button type="submit" onClick={this.handleSubmit} className="btn btn-default"> Log in</button>
                   
                  </div>
                </form>
                <br />
              </div>
                
            </div>
          </div>
     
          </div>
      )
    }
  
}

export default Loginform;
