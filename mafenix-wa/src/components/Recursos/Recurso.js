// Dependencias
import React, { Component } from 'react';

//Assets
import Image from '../Global/images/book.png';
import { Link } from 'react-router-dom'

class Recurso extends Component {
	render(){
		return(
			<div className="col-sm-6 col-md-4 p0">
				<div className="box-two proerty-item">
					<div className="item-thumb" >
					<Link to={`/recursos/${this.props.id}`}>
						<img src={Image}  alt=""/>
					</Link>
					</div>
					<div className="item-entry overflow">
						<h5 className="limit1" ><a>{this.props.name}</a></h5>
						<div className="dot-hr"></div>
						<span className="pull-left"><b> Descripcion :</b> {this.props.scoreresource_id} </span>
						<span className="proerty-price pull-left limit"> <b></b> {this.props.link}</span>
						<p style={{display: undefined}}></p>
						
					</div>
				</div>
			</div>	
		);
	}
}

export default Recurso;