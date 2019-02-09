// Dependencias
import React, { Component } from 'react';
import Recurso from './Recurso.js';

class Contenido extends Component {
	render(){
		return(
			<div className="col-md-9  pr0 padding-top-40 properties-page">
				<div className="col-md-12 clear"> 
					<div id="list-type" className="proerty-th">
						{this.props.listado.map((recurso)=>{
								return (
								<Recurso key={recurso.id} id={recurso.id} name={recurso.name} scoreresource_id={recurso.scoreresource_id} link={recurso.description}  />
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
