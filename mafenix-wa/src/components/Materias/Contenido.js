// Dependencias
import React, { Component } from 'react';
//Componentes
import Materia from './Materia.js';

class Contenido extends Component {

	render(){

		return(
			<div className="col-md-9  pr0 padding-top-40 properties-page">
				<div className="col-md-12 clear"> 
					<div id="list-type" className="proerty-th">
						{this.props.listado.map((materia)=>{
								return (
								<Materia key={materia.id} name={materia.name} code={materia.code} id = {materia.id}  />
								)
							})
						}
					</div>
				</div>	
			</div>
		);
	}
}

export default Contenido;
