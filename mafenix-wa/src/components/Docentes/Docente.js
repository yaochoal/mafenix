// Dependencias
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//Assets
import Like from '../Global/images/like.png';
import Dislike from '../Global/images/dislike.png';
import Image from '../Global/images/perfil.png';

class Docente extends Component {
	render(){
		return(
			<div className="col-sm-6 col-md-4 p0">
				<div className="box-two proerty-item">
					<div className="item-thumb" >
					<Link to={`/docentes/${this.props.id}`}>
						<img src={Image}  alt=""/>
						</Link>
					</div>
					<div className="item-entry overflow">
						<h5>{this.props.name}</h5>
						<div className="dot-hr"></div>
						<span className="pull-left"><b> Descripcion :</b>  </span>
						<span className="proerty-price pull-left limit"> {this.props.description}</span>
				
						<div className="property-icon">
							<img src={Like} alt=""/>({this.props.likes})
							<img src={Dislike} alt=""/>({this.props.dislikes})
						</div>
					</div>
				</div>
			</div>	
		);
	}
}

export default Docente;