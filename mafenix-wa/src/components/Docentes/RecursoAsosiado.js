// Dependencias
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//Assets
import recurso from '../Global/images/book1.png';

class RecursoAsociado extends Component {
	render(){
		return(
		<div>
			<ul>
				<li>
					<div className="col-md-3 col-sm-3 col-xs-3 blg-thumb p0">
					<Link to={`/recursos/${this.props.id}`}>
						<img src={recurso} alt=""/>
					</Link>
					</div>
					<div className="col-md-8 col-sm-8 col-xs-8 blg-entry">
						<h6> <a>{this.props.name}</a></h6>
						<span className="property-price"></span>
					</div>
				</li>
			</ul>
		</div>
		);
	}
}

export default RecursoAsociado;
