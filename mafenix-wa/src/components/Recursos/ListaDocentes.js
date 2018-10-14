// Dependencias
import React, { Component } from 'react';
//Componentes
import DocenteAsociado from './DocenteAsociado.js';

class ListaDocentes extends Component {
	render(){
		if(this.props.listado === undefined){return(<div></div>)}
		else{
		return(
			<div className="panel panel-default sidebar-menu similar-property-wdg wow fadeInRight animated">
				<div className="panel-heading">
					<h3 className="panel-title">Docentes Asociadas </h3>
				</div>
				<div className="panel-body recent-property-widget">
					{this.props.listado.map((docente)=>{
							return (
							<DocenteAsociado key={docente.id} name={docente.teacher_name} id = {docente.teacher_id} />
							)
						})
					}
				</div>
			</div>
		);
	}
}
}

export default ListaDocentes;
