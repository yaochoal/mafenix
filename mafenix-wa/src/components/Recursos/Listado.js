//Dependencias
import React, { Component } from 'react';

//Componentes
import Title from '../Global/Title';
import Busqueda from '../Global/Busqueda.js';
import Contenido from './Contenido.js';
import { Link } from "react-router-dom";
import ApolloClient from 'apollo-boost';
import gql from "graphql-tag";

import baseURL from "../../url"
const client = new ApolloClient({
  uri: `${baseURL}`
});


class Listado extends Component {
	constructor() {
		super()
		this.state = { data_a: [] , count: 1}
		client.query({
      query: gql`
      query{
        allResources(page:${this.state.count}){
          id
          name
		  description
		  link
		  created_at
        }
    }`
    })
    .then(data => {
      //console.log(data.data.allResources)
      this.setState({ data_a: data.data.allResources})
    })
	.catch(error => console.error(error));
	this.handleCountClick = this.handleCountClick.bind(this);


	}

	handleCountClick(e) {
		if (e.target.id === 'add') {
			this.setState({
				count: this.state.count + 1
			});
		} else if (e.target.id === 'subtract' && this.state.count > 1) {
			this.setState({
				count: this.state.count - 1
			});
		} else {
			this.setState({
				count: 1
			});
		}

		client.query({
			query: gql`
			query{
			  allResources(page:${this.state.count}){
				id
				name
				description
				link
				created_at
			  }
		  }`
		  })
		  .then(data => {
			//console.log(data.data.allResources)
			this.setState({ data_a: data.data.allResources})
		  })
		  .catch(error => console.error(error));
	}
	
	

	render(){
		return(
			<div>
				<Title title='Recursos'/>
				<div className="col-md-3 p0 padding-top-40">
					<div className="blog-asside-right pr0">
						<Busqueda />
						<Link to='/crearrecurso'><button type="submit" className="btn btn-default">Crear recurso</button></Link> 	
					</div>
				</div>
				<Contenido listado={this.state.data_a}/>
				<div className="col-md-12"> 
					<div className="pull-right">
						<div className="pagination">
								<ul>
									<button type="submit" id = "subtract"onClick={this.handleCountClick} className="btn btn-default">Prev</button>
									<button type="submit" className="btn btn-default">{this.state.count-1}</button>
									<button type="submit" id = "add"onClick={this.handleCountClick} className="btn btn-default">Next</button>
								</ul>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Listado;