import React, { Component } from 'react';
import Title from '../Global/Title';
import baseURL from '../../url'
import swal from 'sweetalert2'
import FileBase64 from 'react-file-base64';
import axios from 'axios';
import store from '../../store';
import { logPageView } from '../../analytics';
class Contenido extends Component {
 constructor(props){
				super(props);
				this.state = {
						id: '',
						nombre : '',
						nombreErr :'',
						datos: null,
						mensaje : '',
						mensajeErr: ''
				}
				this.handleInput =this.handleInput.bind(this);
				this.validar = this.validar.bind(this);
				this.onSubmit = this.onSubmit.bind(this);
				logPageView();
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
				

		}

		onSubmit(e){

//        console.log(this.state);
				e.preventDefault();
				if((this.state.nombreErr !=="" || this.state.nombre === '' || this.state.datos=== null || this.state.mensaje === '')  ){
					 swal("Llene los campos señalados",'','error'); 
				}else{
						let axiosConfig = {
				 headers: {
					 'Content-Type': 'application/json;'
									}
							};
							axios.post(`${baseURL}/tests`, {
				resource: this.state.datos.base64,
				 name: this.state.nombre,
				 description: this.state.mensaje,
				 user_id: store.getState().id
			 }, axiosConfig)
			 .then(function (response) {
			 //  this.setState({response.data.id});
				 
				})
				.catch(function (error) {
				console.log(error);
			 });

						swal("Su recurso ha sido creado",'','success');
				}
				this.setState( {
						nombre : '',
						nombreErr :'',
						mensaje : '',
						mensajeErr: ''

				});  

				


			
			 };


		getFiles(files){
	 this.setState({datos: files})
 //  console.log(this.state.datos);
	}



	render(){
		return(<div>
			<Title title='Crear recurso'/>
			<div className="col-md-9  pr0 padding-top-40 properties-page">
			<div className="col-md-8 col-md-offset-2"> 
				<h2>Formato de recurso</h2>
						<form>
								<div className="row">
										<div className="col-sm-6">
												<div className="form-group">
														<label  color='red'>Nombre(s) &nbsp; <font color='red'> {this.state.nombreErr}</font></label>
														<input type="text" className="form-control" id="firstname" name ='nombre'value={this.state.nombre} onChange = {this.handleInput}onInput = {this.validar} onBlur = {this.validar}required/>                        
												</div>
										</div>
										
										<div className="col-sm-12">
												<div className="form-group">
														<label >Descripcion &nbsp; <font>{this.state.mensajeErr}</font></label>
														<textarea id="message" className="form-control" name='mensaje'value = {this.state.mensaje} onChange = {this.handleInput }></textarea>
												</div>
												 <div className="form-group">
														<label >Archivo del recurso: </label>
												<FileBase64 className="form-control"
										multiple={ false }
										 onDone={ this.getFiles.bind(this) } />
										 </div>
										</div>
										<div className="col-sm-12 text-center">
												<button type="submit" className="btn btn-primary" onClick ={this.onSubmit}><i className="fa fa-envelope-o"  ></i> Crear recurso</button>
										</div>

								</div>

						</form>

				</div>
			</div>
			</div>
		);
	}
}

export default Contenido;