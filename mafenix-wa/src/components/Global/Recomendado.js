// Dependencies
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Image from '../Global/images/book1.png';

class Recomendados extends Component {
	
	render() {
		return (
				<li>
					<div className="col-md-3 col-sm-4 col-xs-4 blg-thumb p0">
						<Link to={`/recursos/${this.props.id}`}>
							<img src={Image}  alt=""/>
						</Link>
						<span className="blg-date">{this.props.date} </span>
					</div>
					<div className="col-md-8  col-sm-8 col-xs-8  blg-entry">
						<h6>{this.props.name}</h6> 
						<span className="property-price"><b><font color="green" size={3}>Likes</font> <font color="green" size={2}>{this.props.likes}</font></b></span>
					</div>
				</li>
		);
	}
}

export default Recomendados;
