import React, { Component } from 'react';
import { enviarDatos } from './enviarDatos';
import swal from 'sweetalert2'
import Title from '../Global/Title';
import { logPageView } from '../../analytics';
class Registerform extends Component {
constructor(props) {
    super(props);
    this.state = { email: "", password: "", name: "", registrado: 0, nameErr:"", emailErr:"", passErr:"", validacionbackuser:"", validacionbackemail:"",todos:[]}

    this.validar = this.validar.bind(this);
    this.vali = this.vali.bind(this);
    logPageView();

  }

 setField (e) {
  if(e.target.id === 'email1'){
    this.setState({
      email: e.target.value
    })
    }
    if(e.target.id === 'password1'){
    this.setState({
      password: e.target.value
    })
    }
    if(e.target.id === 'name'){
    this.setState({
      name: e.target.value
    })
    }
  }

 
    componentWillMount(){
        fetch('https://mafe-app-back.herokuapp.com/contacts')
        .then(res => res.json())
        .then(res => 
            this.setState({
                todos: res

            })
        );
        
    }
    

  validar(e){

    if ((this.state.name.length <3 && this.state.name.length!==0)|| ((this.state.name === "u")&&(e.target.id ==='name'))){
            this.setState({nameErr: 'No es nombre valido'});
        }
    if(this.state.name.length >=3){
            this.setState({nameErr: ''});
        }
    if((this.state.email.indexOf('@') === -1 && this.state.email.length !==0) || ((this.state.email=== "")&&(e.target.id ==='email1'))){
            this.setState({emailErr: 'No es una direccion de correo'});
        }

    if(this.state.email.indexOf('@') > -1){
            this.setState({emailErr: ''});
        }
    if ((this.state.password.length <2 && this.state.password.length!==0)|| ((this.state.password === "")&&(e.target.id ==='password1'))){
            this.setState({passErr: 'No es una contraseña valida'});
          }
    if(this.state.password.length >=2){
            this.setState({passErr: ''});
        }
  }
  vali(e){
      const todoList = []
        this.state.todos.map((todo,index) =>

                    todoList.push(String(todo.name))

            )
            
        const usercom = []
        this.state.todos.map((todo,index) =>

                    usercom.push(String(todo.email))

            )

        if(e.target.id ==='name'){
        var j
        for(j=0; j<todoList.length;j++){

          
            if (todoList[j]===e.target.value){
              this.setState({validacionbackuser:'El nombre de usuario ya está en uso'})
            }
            
        }

        }if(e.target.id ==='email1'){
          var i
        for(i=0; i<usercom.length;i++){

            if (usercom[i]===e.target.value){
              this.setState({validacionbackemail:'El Email ya está en uso'})
            }
            
        }

        }

        

    }




  handleSubmit = (e) =>{
    const loginParams = {
    "username": this.state.name,
    "email": this.state.email,
    "password": this.state.password, 
    "password_confirmation":  this.state.password,
    "avatar": "https://robohash.org/quasiquianihil.png?size=300x300&set=set1"
    }
   if((this.state.nameErr !=="")||(this.state.emailErr !== "") ||(this.state.passErr !== "") ||(this.state.validacionbackuser !== "") || (this.state.validacionbackemail !== "") || (this.state.name === "") || (this.state.email === "") || (this.state.password === "")){
           swal("Digite los campos señalados",'','error'); 
    }else{
            swal("Se ha registrado exitosamente",'','success');
            enviarDatos(loginParams).then((token) => {
      //localStorage.setItem("jwtToken", token.jwt)
    }).then(  this.setState({registrado: 1}) ).catch((error) => {
     // this.setState({error: "Email o contraseña incorrecta"})
    });
        }
    

  }
  render() {
    //console.log(this.state.todos)
    
    
       // console.log(usercom)
        
        
    
        

    
    if(this.state.registrado === 1){
     

      return(<div>
        <Title title='Sign up'/>
        <div className="register-area" style={{backgroundColor: 'rgb(249, 249, 249)'}}>
        
        <div className="container">
        <div className="col-md-6">
       <div className="box-for overflow">
        <div className="col-md-12 col-xs-12 register-blocks">
        <br></br>
          <h2>Registrado exitosamente! </h2> 
        <br></br>
        <br></br>
          <h2>Bienvenido {this.state.name} </h2> 
        <br></br>
          </div>
      </div>
    </div>
      </div>
      </div>
      </div>)

    }else
   
     return(

<div><Title title='Sign up'/>
        <div className="register-area" style={{backgroundColor: 'rgb(249, 249, 249)'}}>
        
        <div className="container">

          <div className="col-md-6">
       <div className="box-for overflow">
        <div className="col-md-12 col-xs-12 register-blocks">
          <h2>Registrate : </h2> 
          <form >
            <div className="form-group">
              <label htmlFor="name">Nombre &nbsp; <font color = 'red'>{this.state.nameErr}{this.state.validacionbackuser}</font></label>
              <input type="text" onChange={(e)=>this.setField(e)} onBlur={(e)=>this.vali(e)} onInput={(e)=>this.validar(e)} className="form-control" id="name" required/>
            </div>
            <div className="form-group">
              <label htmlFor="email">Email &nbsp; <font color = 'red'>{this.state.emailErr}{this.state.validacionbackemail}</font></label>
              <input type="text" onChange={(e)=>this.setField(e)} onBlur={(e)=>this.vali(e)} onInput={(e)=>this.validar(e)} className="form-control" id="email1" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Contraseña &nbsp; <font color = 'red'>{this.state.passErr}</font></label>
              <input type="password" onChange={(e)=>this.setField(e)} onInput={(e)=>this.validar(e)} className="form-control" id="password1" />
            </div>
            <div className="text-center">
              <button type="submit" onClick={this.handleSubmit} className="btn btn-default">Registrarse</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </div>
    </div>
    </div>
      )
    }
  
}

export default Registerform;