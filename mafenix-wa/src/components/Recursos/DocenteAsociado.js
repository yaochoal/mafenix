// Dependencias
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//Assets
import perfil from '../Global/images/perfil.png';

class DocenteAsociado extends Component {
	
	render(){
		return(
		<div>
			<ul>
				<li>
					<div className="col-md-3 col-sm-3 col-xs-3 blg-thumb p0">
						<Link to={`/docentes/${this.props.id}`}>
							<img src={perfil} alt=""/>
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

export default DocenteAsociado;
