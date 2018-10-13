// Dependencies
//https://developers.facebook.com/apps/
//https://console.developers.google.com/?pli=1
//HTTPS=true npm start
//https://apps.twitter.com/
import React, { Component } from 'react';
import { loginUser } from './loginUser';
import { obtenerDatos } from './obtenerDatos';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import TwitterLogin from 'react-twitter-auth';

class Loginform extends Component {
constructor() {
    super();
    this.state = { email: null, password: null, s_users: [], error: null};
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
      loginUser(loginParams,'user_token').then((token) => {
      localStorage.setItem("jwtToken", token.jwt)
    }).then(  this.setState({error: null}) ).catch((error) => {
      this.setState({error: "Email o contraseña incorrecta"})
    });
    if(this.state.error === null){
    setTimeout(function(){document.location.reload()},1000);
    }

  }



  responseGoogle = (response) => {

  console.log(response)
  localStorage.setItem("googleToken", response.tokenId);
  //console.log(response.accessToken)
  // console.log(response.tokenId)
  // setTimeout(function(){document.location.reload()},1000);
  // console.log("metodo")
  };

 twitterResponse = (response) => {
 console.log(response)
 };

 facebookResponse = (response) => {
//localStorage.setItem("facebookToken", response.accessToken);
 console.log(response.accessToken)
 };



  render() {
     return(<div>
          <div className="col-md-6">
            <div className="box-for overflow">                         
              <div className="col-md-12 col-xs-12 login-blocks">
                <h2>Login : </h2> 
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
                <h2>Login with social networks: </h2> 
                
                <br /><br />
                   <GoogleLogin
              clientId="632745193287-uoccb1hhi2fi0lljofc91b463l1efffn.apps.googleusercontent.com"
               buttonText="Login with google"
               onSuccess={this.responseGoogle}
                onFailure={this.responseGoogle}
                />
                <br /><br /><br />
                 <FacebookLogin
                        appId="1410463869053601"
                        autoLoad={false}
                        fields="name,email,picture"
                        callback={this.facebookResponse} />
                        <br /><br /><br />
                          <TwitterLogin loginUrl="http://localhost:3000/twitters"
                                   onFailure={this.twitterResponse} onSuccess={this.twitterResponse}
                                   requestTokenUrl="http://localhost:3000/twitters"/>
                
              </div>
                
            </div>
          </div>
          </div>
      )
    }
  
}

export default Loginform;
