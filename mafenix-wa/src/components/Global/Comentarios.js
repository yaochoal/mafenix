// Dependencias
import React, { Component } from 'react';
import swal from 'sweetalert2';
import store from '../../store';
//import ReCAPTCHA from 'react-google-recaptcha';
import ApolloClient from 'apollo-boost';
import gql from "graphql-tag";
//Componentes
import Comentario from './Comentario.js';
import baseURL from "../../url"
const client = new ApolloClient({
  uri: `${baseURL}`
});



class Comentarios extends Component {
	constructor(){
		super()
		this.state ={
			texto: "",
			errTexto:"",
			data_a:[],
			catcha: null
		}
	}

	componentWillMount(){
		//console.log(this.props.recurso);
		//console.log(this.props.post_id);
			client.query({
				query: gql`
				query{
					commentByService(comment:{
					  service: "${this.props.recurso}"
					  service_id: ${this.props.post_id}
					}){
					  id
					  comment
					  service
					  service_id
					  user_id
					  created_at
					  
					}
				  }`
			  })
			  .then(data => {
				//console.log(data.data.commentByService)
				this.setState({ data_a: data.data.commentByService})
			  })
			  .catch(error => console.error(error));
	}
	


	enviarComentario=(e)=>{
		/*
		console.log(this.state.catcha)
		if(this.state.catcha === null){
			swal('Comprueba el ReCAPTCHA','', 'warning');
		}else{ }
			*/
			if(this.state.errTexto !== ''){
			swal('Reduce el contenido de tu comentario','', 'error');
		}else if(this.state.texto === ""){
			swal('Escribe un comentario','','warning')
		}
		else{
			console.log(this.state.texto)

			client.mutate({
				mutation: gql`
				mutation{
					createComment(comment:{
					  service_id: ${this.props.post_id}
					  service: "${this.props.recurso}"
					  user_id: "${store.getState().id}"   
					  comment: "${this.state.texto}"
					}){
					  id
					  service
					  service_id
					  user_id
					}
				  }`
			  })
			  .then(data => {
				console.log(data.data.createComment)
				setTimeout(function(){document.location.reload()},300);
			  })
			  .catch(error => console.error(error));
		}
		
	  
	  

	}
	valida(e){
		if((this.state.texto.length > 150) && (e.target.id ==='comment') ){
			this.setState({errTexto: 'El comentario debe ser menor a 150 caracteres'});
		}

	}
	actualizarTexto=(e)=>{
		this.setState({texto: e.target.value});
	}
	 cambio=(value)=> {
  console.log("Captcha value:", value);
  		this.setState({catcha: value});
}
	render(){

		//console.log(this.state)
		if(localStorage.getItem('jwtToken')){
			//console.log(this.state.data_a)
		if(this.state.data_a === undefined){return(<div></div>)
		}else  {
		return(
			<div>	
			<h6 className="text wow fadeInLeft animated">Comentarios</h6>
			{this.state.data_a.map((comentario)=>{return(<Comentario service_id={comentario.service_id}
						 key={comentario.id} service={comentario.service} created_at={comentario.created_at} 
						 comment = {comentario.comment} id={comentario.id} user_id = {comentario.user_id} />)})}
				<section id="comment-form" className="add-comments">
					<div>
						<div className="row wow fadeInRight animated">
							<div className="col-sm-12">
								<div className="form-group">
									<label htmlFor="comment">Agrega un comentario &nbsp; <font color='red'>{this.state.errTexto}</font><span className="required"></span>
									</label>
									<textarea className="form-control" id="comment" value={this.state.texto} onChange={this.actualizarTexto} onInput={(e)=>this.valida(e)} rows={4} />
								</div>
							</div>
						</div>
						<div className="row wow fadeInRight animated">
							<div className="col-sm-12 text-right">
							{/*
							 <ReCAPTCHA
    ref="recaptcha"
    sitekey="6Ldsc1wUAAAAAEiVmREb4Q1R3nGJVJ-mNIWqndUN"
    onChange={this.cambio}
							/>*/}
								<button className="btn btn-primary" onClick={this.enviarComentario}><i className="fa fa-comment-o" /> Comentar</button>
							</div>
							    
						</div>
					</div>
				</section>
			</div>
				);
				}
		}else{
			if(this.state.data_a === undefined){return(<div></div>)
		}else  {
		return(
				<div>
					<h6 className="text wow fadeInLeft animated"><a>Comentarios</a></h6>
		         	{this.state.data_a.map((comentario)=>{
						 return(<Comentario service_id={comentario.service_id}
						 key={comentario.id} service={comentario.service} created_at={comentario.created_at} 
						 comment = {comentario.comment} id={comentario.id} user_id = {comentario.user_id}
						  />)})}
					</div>
				);}
			 }
}
}

export default Comentarios;
