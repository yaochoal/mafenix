// Dependencias
import React, { Component } from 'react';
//Componentes
import MateriaAsociada from './MateriaAsociada.js';

class ListaMaterias extends Component {
	render(){
		if(this.props.listado === undefined){return(<div></div>)}
		else{
		return(
			<div className="panel panel-default sidebar-menu similar-property-wdg wow fadeInRight animated">
				<div className="panel-heading">
					<h3 className="panel-title">Materias Asociadas</h3>
				</div>
				<div className="panel-body recent-property-widget">
					{this.props.listado.map((materia)=>{
							return (
							<MateriaAsociada key={materia.id} name={materia.course_name} id = {materia.course_id} likes = {materia.likes_course} />
							)
						})
					}
				</div>
			</div>
		);
	}
}
}

export default ListaMaterias;
