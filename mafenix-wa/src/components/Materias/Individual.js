// Dependencias
import React, { Component} from "react";
import { Link } from "react-router-dom";
//Componentes
import Title from '../Global/Title';
import Grafico from '../Global/Grafico';
import Comentarios from '../Global/Comentarios.js';
import ListaRecursos from './ListaRecursos.js';
import DocenteMateria from './DocenteMateria.js';
//Assets
import { logPageView } from '../../analytics';
//graphql
import ApolloClient from 'apollo-boost';
import gql from "graphql-tag";

import baseURL from "../../url"
const client = new ApolloClient({
  uri: `${baseURL}`
});


class Individual extends Component {
constructor() {
		super()
		this.state = { data_a: [] }
		 logPageView();
	}
	componentWillMount(){
		client.query({
			query: gql`
			query{
				courseById(id:${this.props.match.params.id}){
				  id
				  name
				  description
				  code
				  teacher_has_courses {
					id
					teacher_id
					teacher_name
					teacher_description
					course_id
					course_name
					course_description
					course_code
				  }
				  course_has_resources {
					id
					resource_id
					resource_name
					resource_description
					resource_link
					course_id
					course_name
					course_description
					course_code
				  }
				}
			  }`
		  })
		  .then(data => {
			//console.log(data.data.courseById)
			this.setState({ data_a: data.data.courseById})
		  })
		  .catch(error => console.error(error));
	}
	render() {
		return (
			<div >
				
				<Title title={this.state.data_a.name}/>
				<div className="content-area single-property" style={{backgroundColor: '#FCFCFC'}}>
					<div className="container">
						<div className="clearfix padding-top-40">
							<div className="col-md-8 single-property-content ">
								<div className="single-property-wrapper">
									<div className="single-property-header">
										<h3><b>Codigo: {this.state.data_a.code}</b></h3>
										<Grafico recurso="courses" post_id={this.props.match.params.id} />
										<div className="section">
											<section id="comments" className="comments wow fadeInRight animated"> 
												<h6 className="text wow fadeInLeft animated"><a>Description</a></h6>
												<div className="s-property-content">
													<p>{this.state.data_a.description}</p>
												</div>
												<Comentarios recurso="courses" post_id={this.props.match.params.id} />
												</section>
										</div>
									</div>
								</div>
							</div>
							<DocenteMateria listado = {this.state.data_a.teacher_has_courses} />
							<div className="col-md-4 p0">
								<aside className="sidebar sidebar-property blog-asside-right">
									<div className="panel panel-default sidebar-menu similar-property-wdg wow fadeInRight animated">
										<div className="panel-heading">
										<ListaRecursos listado = {this.state.data_a.course_has_resources}/>
												</div>
											<div className="panel-body recent-property-widget">
											</div>
									</div>
									
								</aside>
							</div>
						</div>
						<Link to='/materias'>Volver</Link>
					</div>
				</div>
			</div>
		);
	}
}

export default Individual;
