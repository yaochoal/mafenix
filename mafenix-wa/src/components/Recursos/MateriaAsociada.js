// Dependencias
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//Assets
import materia from '../Global/images/book1.png';

class MateriaAsociada extends Component {
	render(){
		return(
		<div>
			<ul>
				<li>
					<div className="col-md-3 col-sm-3 col-xs-3 blg-thumb p0">
						<Link to={`/materias/${this.props.id}`}>
							<img src={materia} alt=""/>
						</Link>
					</div>
					<div className="col-md-8 col-sm-8 col-xs-8 blg-entry">
						<h6> <a>{this.props.name}</a></h6>
						
					</div>
				</li>
			</ul>
		</div>
		);
	}
}

export default MateriaAsociada;
