import React, { Component } from 'react';
import Title from '../Global/Title';
import swal from 'sweetalert2'
import { logPageView } from '../../analytics';
import baseURL from "../../url";
import axios from 'axios';
//import { Mutation } from 'react-apollo';
//import Dropzone from 'react-dropzone';

//import gql from "graphql-tag";
//import { createUploadLink } from 'apollo-upload-client';
//import { ApolloClient } from 'apollo-client';
//import { InMemoryCache } from 'apollo-cache-inmemory';
/*
const link = createUploadLink({ uri: 'http://192.168.99.101:5500/graphql' });
const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

const uploadFileMutation = gql`
  mutation($file: Upload!) {
    uploadFile(file: $file)
  }
`;
*/
class Contenido extends Component {
 constructor(props){
				super(props);
				this.state = {
						id: '',
						nombre : '',
						nombreErr :'',
						datos: null,
						mensaje : '',
						mensajeErr: '',
						file: []
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
		onChange=(e)=>{
			let files = e.target.files
			//console.warn("datafile",files[0])
			this.setState({
				file:files[0]
		});
		}
		onSubmit(e){

//        console.log(this.state);
				e.preventDefault();
				if((this.state.nombreErr !=="" || this.state.nombre === '' || this.state.file=== null || this.state.mensaje === '')  ){
					 swal("Llene los campos señalados",'','error'); 
				}else{
					//console.log(this.state.file);
					/*
						client.mutate({
							mutation: gql`
							mutation{
								createResource(resource:{
								  name: "${this.state.nombre}"
								  description:"${this.state.mensaje}"
								  
								}){
								  id
								}
							  }
							`
						  })
						  .then(data => {
							console.log(data.data.createResource.id)
							swal("Su recurso ha sido creado",'','success');
						  })
						  .catch(error => console.error(error));
						  */
						 var bodyFormData = new FormData();
						 bodyFormData.set('name', `${this.state.nombre}`);
						 bodyFormData.set('description', `${this.state.mensaje}`);
						 bodyFormData.append('file', this.state.file); 
						  axios({
							method: 'post',
							url: `http://35.203.23.236:4000/resources`,
							data: bodyFormData,
							config: { headers: {'Content-Type': 'multipart/form-data' }}
							})
							.then(function (response) {
								//handle success
								console.log(response);
							})
							.catch(function (response) {
								//handle error
								console.log(response);
							});
						  
				}
				this.setState( {
						nombre : '',
						nombreErr :'',
						mensaje : '',
						mensajeErr: ''
				});  
			 };
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
												<input type="file" name ="file" onChange={this.onChange}/>
												
										 </div>
										</div>
										<div className="col-sm-12 text-center">
												<button type="submit" className="btn btn-primary" onClick ={this.onSubmit}><i className="fa fa-envelope-o"  ></i> Crear recurso</button>
			{/*																			<Mutation mutation={uploadFileMutation}>
    {mutate => (
      <Dropzone onDrop={([file]) => mutate({ variables: { file } })}>
        <p>Try dropping some files here, or click to select files to upload.</p>
      </Dropzone>
    )}
	</Mutation>*/}

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
