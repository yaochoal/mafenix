// Dependencies
//https://developers.facebook.com/apps/
//https://console.developers.google.com/?pli=1
//HTTPS=true npm start
//https://apps.twitter.com/
//https://console.firebase.google.com/project/mafe-app/overview
import React, { Component } from 'react';
import { loginUser } from './loginUser';
import { obtenerDatos, pPost } from './obtenerDatos';
import firebase from 'firebase'
import swal from 'sweetalert2'
import { logPageView } from '../../analytics';
class Loginform extends Component {
constructor() {
    super();
    this.state = { email: null, password: null, s_users: [], error: null};
    logPageView();
  }

  componentWillMount(){
    //obtener datos del token jwt en el link users
    if (localStorage.getItem('jwtToken')) {
      obtenerDatos(localStorage.getItem('jwtToken'),'users').then((users) => {
        this.setState({ s_users: users })
      })
    }
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
      const loginParams = {"auth": {"email": this.state.email, "password": this.state.password}}
      loginUser(loginParams).then((token) => {
      localStorage.setItem("jwtToken", token.jwt)
    }).then(  this.setState({error: null}) ).catch((error) => {
      this.setState({error: "Email o contraseña incorrecta"})
    });
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
    
  }

  googleResponse = (response) => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
     const loginParams = {"name": result.additionalUserInfo.profile.name,"email": result.additionalUserInfo.profile.email,
     "avatar": result.additionalUserInfo.profile.picture }
      pPost(loginParams,"socials").then((token) => {
    console.log(token);
    
     // console.log(token.jwt);
     localStorage.setItem("jwtToken", token.jwt)
      setTimeout(function(){document.location.reload()},1000);
      swal({
      title:'Cargando...',
      text:'',
      timer:1000,
      onOpen: () =>{
        swal.showLoading()}  })   })
   

   
    if(this.state.error === null){
   // setTimeout(function(){document.location.reload()},1000);
    }
  // This gives you a Google Access Token. You can use it to access the Google API.
  //var token = result.credential.accessToken;
  // The signed-in user info.
  //var user = result.user;
}).catch(function(error) {
  // Handle Errors here.
  //var errorCode = error.code;
  //var errorMessage = error.message;
  // The email of the user's account used.
 // var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  //var credential = error.credential;
  // ...
});
  };
  

 twitterResponse = (response) => {
 var provider = new firebase.auth.TwitterAuthProvider();
 firebase.auth().signInWithPopup(provider).then(function(result) {
  const loginParams = {"name": result.additionalUserInfo.profile.name,"email": `${result.additionalUserInfo.profile.screen_name}@correo.com`,
     "avatar": result.additionalUserInfo.profile.profile_image_url }
     
     pPost(loginParams,"socials").then((token) => {
    console.log(token);
    
     // console.log(token.jwt);
     localStorage.setItem("jwtToken", token.jwt)
      setTimeout(function(){document.location.reload()},1000);
      swal({
      title:'Cargando...',
      text:'',
      timer:1000,
      onOpen: () =>{
        swal.showLoading()}  })   })
   

   
    if(this.state.error === null){
   // setTimeout(function(){document.location.reload()},1000);
    }
  // This gives you a Google Access Token. You can use it to access the Google API.
  //var token = result.credential.accessToken;
  // The signed-in user info.
  //var user = result.user;
}).catch(function(error) {
  // Handle Errors here.
  //var errorCode = error.code;
  //var errorMessage = error.message;
  // The email of the user's account used.
 // var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  //var credential = error.credential;
  // ...
});
 };

 facebookResponse = (response) => {
  var provider = new firebase.auth.FacebookAuthProvider();
  firebase.auth().signInWithPopup(provider).then(function(result) {
 const loginParams = {"name": result.additionalUserInfo.profile.name,"email": result.additionalUserInfo.profile.email,
     "avatar": result.additionalUserInfo.profile.picture.data.url }
      pPost(loginParams,"socials").then((token) => {
    console.log(token);
    
     // console.log(token.jwt);
     localStorage.setItem("jwtToken", token.jwt)
      setTimeout(function(){document.location.reload()},1000);
      swal({
      title:'Cargando...',
      text:'',
      timer:1000,
      onOpen: () =>{
        swal.showLoading()}  })   })
   

   
    if(this.state.error === null){
   // setTimeout(function(){document.location.reload()},1000);
    }
  // This gives you a Google Access Token. You can use it to access the Google API.
  //var token = result.credential.accessToken;
  // The signed-in user info.
  //var user = result.user;
}).catch(function(error) {
  // Handle Errors here.
  //var errorCode = error.code;
  //var errorMessage = error.message;
  // The email of the user's account used.
 // var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  //var credential = error.credential;
  // ...
});
 };

signOut = (response) => {
    firebase.auth().signOut().then(function() {
  // Sign-out successful.
  console.log("deslogeado")
}).catch(function(error) {
  // An error happened.
});
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
          <div className="col-md-6">
            <div className="box-for overflow">                         
              <div className="col-md-12 col-xs-12 login-blocks">
                <h2>Iniciar sesión con redes sociales: </h2> 
                <br></br>
                <div className="social pull-left"> 
                <p>
                  <a className="login-social" onClick={this.facebookResponse}><i className="fa fa-facebook"></i>&nbsp;Facebook</a> &nbsp; 

                  <a className="login-social" onClick={this.googleResponse}><i className="fa fa-google-plus"></i>&nbsp;Gmail</a>  &nbsp;
                  <a className="login-social"  onClick={this.twitterResponse}><i className="fa fa-twitter"></i>&nbsp;Twitter</a>   
                </p>
               </div>
                
              </div>
                
            </div>
          </div>
          </div>
      )
    }
  
}

export default Loginform;
