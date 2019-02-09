import React, { Component } from 'react';
import Title from '../Global/Title';
import swal from 'sweetalert2'
import { logPageView } from '../../analytics';
import baseURL from "../../url";
import baseURLfiles from "../../urlfiles";
import axios from 'axios';
import ApolloClient from 'apollo-boost';
import gql from "graphql-tag";

const client = new ApolloClient({
  uri: `${baseURL}`
});
const endpoint = `${baseURLfiles}/upload`
const endpoint1 = `${baseURLfiles}/public/files/`
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
						selectedFile: null,
            loaded: 0,
				}
				this.handleInput =this.handleInput.bind(this);
				this.validar = this.validar.bind(this);
				this.onSubmit = this.onSubmit.bind(this);
				logPageView();
		}
    handleselectedFile = event => {
			this.setState({
				selectedFile: event.target.files[0],
				loaded: 0,
			})
		}
		handleUpload = () => {
			if((this.state.nombreErr !=="" || this.state.nombre === '' || this.state.file=== null || this.state.mensaje === '')  ){
				swal("Llene los campos señalados",'','error'); 
		 }else{
			 
				 client.mutate({
					 mutation: gql`
					 mutation{
						 createResource(resource:{
							 name: "${this.state.nombre}"
							 description:"${this.state.mensaje}"
							 link: "este es el nuevo link"
						 }){
							 id
							 name
							 description
						 }
						 }
					 `
					 })
					 .then(data => {
					 console.log(data.data.createResource.id)
					 const datafile = new FormData()
					datafile.append('file', this.state.selectedFile, "resource"+data.data.createResource.id+".pdf")
					console.log("resource"+data.data.createResource.id+".pdf")
					axios
						.post(endpoint, datafile, {
							onUploadProgress: ProgressEvent => {
								this.setState({
									loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100,
								})
							},
						})
						.then(res => {
							console.log(res.statusText)
						})

						client.mutate({
							mutation: gql`
							mutation{
								updateResource(id:${data.data.createResource.id},resource:{
									name: "${data.data.createResource.name}"
									description:"${data.data.createResource.description}"
									link: "${endpoint1}resource${data.data.createResource.id}.pdf"
								}){
									id
									name
									description
									link
									created_at
								}
							}
							`
							})
							.then(data => {
								console.log("oks");
							})
							.catch(error => console.error(error));

					 swal("Su recurso ha sido creado",'','success');
					 //setTimeout(function () {window.location.replace(`recursos/${data.data.createResource.id}`)},2000);
					 })
					 .catch(error => console.error(error));
		 }
		 
		 this.setState( {
				 nombre : '',
				 nombreErr :'',
				 mensaje : '',
				 mensajeErr: ''
		 });  
		 
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
														<input type="file" name="" id="" onChange={this.handleselectedFile} />
												
										 </div>
										</div>
										<div className="col-sm-12 text-center">
										<div> {Math.round(this.state.loaded, 2)} %</div>
												<button type="submit" className="btn btn-primary" onClick ={this.handleUpload}><i className="fa fa-envelope-o"  ></i> Crear recurso</button>
												<div className="App">
        
        
        
      </div>

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
