// Dependencies
import React, { Component } from 'react';
import Title from '../Global/Title';
import baseURL from '../../url';
import swal from 'sweetalert2';
import { logPageView } from '../../analytics';
class Contacto extends Component {
    constructor(props){
        super(props);
        this.state = {
            nombre : '',
            nombreErr :'',
            apellido : '',
            apellidoErr: '',
            correo : '',
            correoErr : '',
            asunto : '',
            asuntoErr : '',
            mensaje : '',
            mensajeErr: ''

        }
        
        logPageView();
        this.handleInput =this.handleInput.bind(this);
        this.validar = this.validar.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


    }

    handleInput(e){


        this.setState({
            [e.target.name]:e.target.value
        });

        
    };

    validar(e){

        if ((this.state.nombre.length <3 && this.state.nombre.length!==0)|| ((this.state.nombre === "")&&(e.target.name ==='nombre'))){
            this.setState({nombreErr: 'No es nombre valido'});
        }

        if(this.state.nombre.length >=3){
            this.setState({nombreErr: ''});
        }
        if ((this.state.apellido.length <3 && this.state.apellido.length!==0) || ((this.state.apellido === "")&&(e.target.name ==='apellido'))){
            console.log(this.state.apellido.length);
            this.setState({apellidoErr: 'No es apellido valido'});
        }

        if(this.state.apellido.length >=3){
            this.setState({apellidoErr: ''});
        }
        if((this.state.correo.indexOf('@') === -1 && this.state.correo.length !==0)||((this.state.correo === "")&&(e.target.name ==='correo'))){
            this.setState({correoErr: 'No es una direccion de correo'});
        }

        if(this.state.correo.indexOf('@') > -1){
            this.setState({correoErr: ''});
        }



        if ((this.state.asunto.length <3 && this.state.asunto.length!==0)||((this.state.asunto === "")&&(e.target.name ==='asunto'))){
            this.setState({asuntoErr: 'No es asunto valido'});
        }

        if(this.state.asunto.length >=3){
            this.setState({asuntoErr: ''});
        }

    }



    onSubmit(e){

        console.log(this.state);
        e.preventDefault();
        if((this.state.nombreErr !=="")||(this.state.apellidoErr !== "") ||(this.state.asuntoErr !== "") ||(this.state.correoErr !== "") ){
           swal("Digite los campos señalados",'','error'); 
        }else{
            swal("Su mensaje ha sido enviado",'','success');
        }
        

        this.setState( {
            nombre : '',
            nombreErr :'',
            apellido : '',
            apellidoErr: '',
            correo : '',
            correoErr : '',
            asunto : '',
            asuntoErr : '',
            mensaje : '',
            mensajeErr: ''

        });

      const contactParams = {"name": this.state.nombre, "lastname": this.state.apellido,
      "email": this.state.correo, "subject": this.state.asunto, "message": this.state.mensaje}
      const body = JSON.stringify(contactParams)
      return fetch(`${baseURL}/contacts`, {
      method: 'post',
      body: body,
      headers: {
        "Content-Type":"application/json",
        "Accept":"application/json"
      }
      })
      .then((res) => {
        return res.json()
      })   
    };


  render() {
    return (
        <div>
        <Title title='Contáctenos'/>
        <div className="col-md-8 col-md-offset-2"> 
        <h2>Formato de contacto</h2>
            <form>
                <div className="row">
                    <div className="col-sm-6">
                        <div className="form-group">
                            <label  color='red'>Nombre(s) &nbsp; <font color='red'> {this.state.nombreErr}</font></label>
                            <input type="text" className="form-control" id="firstname" name ='nombre'value={this.state.nombre} onChange = {this.handleInput}onInput = {this.validar} onBlur = {this.validar}required/>                        
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="form-group">
                            <label >Apellido(s) &nbsp; <font color='red'> {this.state.apellidoErr}</font></label>
                            <input type="text" className="form-control" id="lastname" name ='apellido' value={this.state.apellido} onChange = {this.handleInput} onInput = {this.validar} required/>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="form-group">
                            <label >Correo Electronico &nbsp; <font color='red'> {this.state.correoErr}</font></label>
                            <input type="text" className="form-control" id="email" name='correo'value={this.state.correo} onChange = {this.handleInput} onInput = {this.validar}required/>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="form-group">
                            <label >Asunto &nbsp; <font color='red'>{this.state.asuntoErr}</font></label>
                            <input type="text" className="form-control" id="subject" name ='asunto'value={this.state.asunto} onChange = {this.handleInput } onInput = {this.validar} required/>

                        </div>
                    </div>
                    <div className="col-sm-12">
                        <div className="form-group">
                            <label >Mensaje &nbsp; <font>{this.state.mensajeErr}</font></label>
                            <textarea id="message" className="form-control" name='mensaje'value = {this.state.mensaje} onChange = {this.handleInput }></textarea>
                        </div>
                    </div>
                    <div className="col-sm-12 text-center">
                        <button type="submit" className="btn btn-primary" onClick ={this.onSubmit}><i className="fa fa-envelope-o"  ></i> Enviar mensaje</button>
                    </div>

                </div>

            </form>

        </div>
        </div>
    );
  }
}

export default Contacto;