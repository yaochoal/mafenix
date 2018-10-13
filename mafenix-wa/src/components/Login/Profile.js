import React, { Component } from 'react';
import store from '../../store';
import FileBase64 from 'react-file-base64';
import axios from 'axios'
import baseURL from '../../url'
import swal from 'sweetalert2'
class Profile extends Component {
  constructor() {
    super();
    this.state = {   nombre : '',
            nombreErr :'',
            correo : '',
            correoErr : ''
            
          }
    this.handleFinish.bind(this);
    this.handleInput =this.handleInput.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
  }

handleFinish(e){
     localStorage.removeItem('jwtToken')
     swal({title:'Vuelve pronto...', timer:1000, showConfirmButton:false, onOpen: () =>{
        swal.showLoading()
      }});
     setTimeout(function(){window.location.reload()},1000);
  }

handleInput(e){
        this.setState({
            [e.target.name]:e.target.value
        });
    };

onSubmit(e){
  if(this.state.nombre === '' && this.state.correo === ''){
    swal({title:'No haz cambiado ningún campo', type:'warning'})
  }else{

 let axiosConfig = {
      headers: {
          'Content-Type': 'application/json;',
          'Authorization': 'Bearer '+ localStorage.getItem('jwtToken')
      }
    };
   axios.patch(`${baseURL}/users/${store.getState().id}`, {
    username: this.state.nombre,
    email:this.state.email
  }, axiosConfig)
  .then(function (response) {
    swal({
      title: '¿Estás seguro?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, lo estoy',
      cancelButtonText: 'Cancelar'
    }).then((result)=> {
      setTimeout(function(){window.location.reload()},2000);
    })
    
    //window.location.reload()
    //console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
        this.setState( {
            nombre : '',
            correo : ''
        });
      }
    };

  getFiles(files){
   console.log(files)
    let axiosConfig = {
      headers: {
          'Content-Type': 'application/json;',
          'Authorization': 'Bearer '+ localStorage.getItem('jwtToken')
      }
    };
   axios.patch(`${baseURL}/users/${store.getState().id}`, {
    base64: files.base64
  }, axiosConfig)
  .then(function (response) {
    swal({
      title:'Cargando...',
      text:'',
      timer:1000,
      onOpen: () =>{
        swal.showLoading()
      }
    })
    window.location.reload()
    //console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
    
     
  }

  render() {
     return(
    <div>
          <div className="page-head"> 
            <div className="container">
                <div className="row">
                    <div className="page-head-content">
                        <h1 className="page-title">Bienvenido : <span className="orange strong">{store.getState().username}</span></h1>               
                    </div>
                </div>
            </div>
        </div>

      <div className="content-area user-profiel" style={{backgroundColor: '#FCFCFC'}}>&nbsp;
        <div className="container">   
          <div className="row">
            <div className="col-sm-10 col-sm-offset-1 profiel-container">
                <div className="profiel-header">




<div className="row p-b-15  ">
        <h3>
                    <b>BIENVENIDO A</b> TU PERFIL <br />
                  </h3>
        <div className="col-sm-4 col-sm-offset-1">
          <div className="picture-container">
            <div className="picture">
                        <img src={`${store.getState().avatar}`} alt ="" className="picture-src" id="wizardPicturePreview"/>
                      </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="form-group">
           <h4 className="s-property-title">Nombre de usuario:</h4>
                      <label>{store.getState().username}</label>
            <input name="nombre" type="text" value={this.state.nombre}  onChange = {this.handleInput} className="form-control" placeholder="Tu nombre de usuario..." />
          </div>
          <div className="form-group">
            <h4 className="s-property-title">Correo electronico:</h4>
                        <label>{store.getState().email}</label>
            <input name="correo" type="text" value={this.state.correo} onChange = {this.handleInput} className="form-control" placeholder="Tu nuevo correo..." />
          </div> 
          <div className="form-group">
            <div className="form-group">
   
            <h4 className="s-property-title">Personaliza tu imagen:</h4>
            <FileBase64 className="form-control"
                    multiple={ false }
                     onDone={ this.getFiles.bind(this) } />
           
             </div>
             <button type="submit" onClick={this.onSubmit} className="btn btn-default">Actualizar tus Datos</button>
             <button type="submit" onClick={this.handleFinish} className="btn btn-default">Cerrar sesión</button>

          </div>
        </div>
      </div>
                  <hr />
                </div>
                <br />
            </div>
          </div>
        </div>
      </div>
    </div>
      )
    }
  
}

export default Profile;