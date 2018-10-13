// Dependencias
import React, { Component } from 'react';
//Componentes
import Docente from './Docente.js';

class Contenido extends Component {
	render(){
		return(
			<div className="col-md-9  pr0 padding-top-40 properties-page">
				<div className="col-md-12 clear"> 
					<div id="list-type" className="proerty-th">
						{this.props.listado.map((docente)=>{
								return( 
								<Docente key={docente.id} name={docente.name} id= {docente.id} description={docente.description} likes={docente.likes} dislikes={docente.dislikes}/>
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