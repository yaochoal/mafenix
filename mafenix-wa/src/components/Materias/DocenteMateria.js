// Dependencias
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//Assets
import perfil from '../Global/images/perfil.png';

class DocenteMateria extends Component {
	
	render(){
		//console.log(this.props.listado)
		if(this.props.listado === undefined || this.props.listado.length === 0){
			return(
				<div className="col-md-4 p0">
					<aside className="sidebar sidebar-property blog-asside-right">
						<div className="dealer-widget">
							<div className="dealer-content">
								<div className="inner-wrapper">
									<div className="clear">
										<div className="col-xs-4 col-sm-4 dealer-face">
											<img src={perfil} className="img-circle" alt=""/>
										</div>
										<div className="col-xs-8 col-sm-8 ">
											<h6 className="dealer-name">Docente</h6>
											<span>Docente</span>
										</div>
									</div>
								</div>
								<div className="clear">
									<ul className="dealer-contacts"></ul>
									<p>Descripcion</p>
								</div>
							</div>
						</div>
					</aside>
				</div>
				)}else{
			//console.log(this.props.listado);
		return(
		<div className="col-md-4 p0">
			<aside className="sidebar sidebar-property blog-asside-right">
				<div className="dealer-widget">
					<div className="dealer-content">
						<div className="inner-wrapper">
							<div className="clear">
								<div className="col-xs-4 col-sm-4 dealer-face">
									<Link to={`/docentes/${this.props.listado[0].teacher_id}`}>
										<img src={perfil} className="img-circle" alt=""/>
									</Link>
								</div>
								<div className="col-xs-8 col-sm-8 ">
									<h6 className="dealer-name">{this.props.listado[0].teacher_name}</h6>
									<span>Docente</span>
								</div>
							</div>
						</div>
						<div className="clear">
							<ul className="dealer-contacts"></ul>
							<p>{this.props.listado[0].teacher_description}</p>
						</div>
					</div>
				</div>
			</aside>
		</div>
		);
	}
}
}

export default DocenteMateria;