// Dependencias
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//Assets
import Image from '../Global/images/book.png';

class Materia extends Component {
	render(){
		return(
			<div className="col-sm-6 col-md-4 p0">
				<div className="box-two1 proerty-item">
					<div className="item-thumb" >
					<Link to={`/materias/${this.props.id}`}>
						<img src={Image}  alt=""/>
					</Link>
					</div>
					<div className="item-entry overflow">
						<h5>{this.props.name}</h5>
						<div className="dot-hr"></div>
						<span className="pull-left"><b> Codigo :</b> {this.props.code} </span>
						<span className="proerty-price pull-right"> {this.props.id}</span>
						<span className="proerty-price pull-left"> <b></b> {this.props.link}</span>
						<p style={{display: undefined}}></p>
						<div className="property-icon">
							
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Materia;
