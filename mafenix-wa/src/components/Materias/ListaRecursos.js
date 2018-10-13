// Dependencias
import React, { Component } from 'react';
//Componentes
import RecursoAsociado from './RecursoAsosiado.js';

class ListaRecursos extends Component {
	render(){
		if(this.props.listado === undefined){return(<div></div>)}
		else{
			return(
				<div className="panel panel-default sidebar-menu similar-property-wdg wow fadeInRight animated">
					<div className="panel-heading">
						<h3 className="panel-title">Recursos Asociados</h3>
					</div>
					<div className="panel-body recent-property-widget">
						{this.props.listado.map((recurso)=>{
								return (
								<RecursoAsociado key={recurso.id} name={recurso.resource_name} id = {recurso.resource_id} likes = {recurso.likes_resource} />
								)
							})
						}
					</div>
				</div>
			);	
		}
	}
}

export default ListaRecursos;
