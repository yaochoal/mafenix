import React, { Component } from 'react';

class Slider extends Component {
  render() {
	return (
	  
		<div className="slider-area">
			<div className="slider">
				<div id="bg-slider" className="owl-carousel owl-theme">

					<div className="item"><img src="assets/img/slider-image-1.jpg" alt="imagen1"/></div>
					<div className="item"><img src="assets/img/slider-image-2.jpg" alt="imagen2"/></div>
					<div className="item"><img src="assets/img/slider-image-1.jpg" alt="imagen3"/></div>

				</div>
			</div>
			<div className="slider-content">
				<div className="row">
					<div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1 col-sm-12">
						<h2>BUSCA INFORMACIÓN DE TUS DOCENTES, RECURSOS Y MATERIAS!</h2>
					   
						<div className="search-form wow pulse" data-wow-delay="0.8s">
							<form action="" className=" form-inline">
							  
								<div className="form-group">
									<input type="text" className="form-control" placeholder="Buscar"/>
								</div>
								
								<div className="form-group">                                     
									<select id="basic" className="selectpicker show-tick form-control">
										<option>Docentes </option>
										<option>Materias </option>
										<option>Recursos</option>
									</select>
								</div>
								<button className="btn search-btn" type="submit"><i className="fa fa-search"></i></button>

												  
<button className="btn search-btn prop-btm-sheaerch" type="submit"><i className="fa fa-search"></i></button> 
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	  
	  
	);
  }
}

export default Slider;