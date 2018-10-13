// Dependencies
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import firebase from 'firebase'

class Footer extends Component {
	constructor(){
		super()
		this.state ={
			name: "",
			data_a: []
		}
	}
	componentWillMount(){
	 const nameRef = firebase.database().ref().child('object').child('name')
	 nameRef.on('value', snapshot => {
		this.setState({
		name: snapshot.val()
	 })
	})

	}
	static propTypes = {
		items: PropTypes.array.isRequired
	};
	render() {
		
		const { items } = this.props;
		return (
			 <div className="footer-area">
				<div className=" footer">
					<div className="container">
						<div className="row">
							<div className="col-md-3 col-sm-6 wow fadeInRight animated">
								<div className="single-footer">
									<h4>Quienes somos? </h4>
									<div className="footer-title-line" />
									<p>Lorem ipsum dolor cum necessitatibus su quisquam molestias. Vel unde, blanditiis.</p>
									<ul className="footer-adress">
										<li><i className="pe-7s-map-marker strong"> </i> Nuestra dirección</li>
										<li><i className="pe-7s-mail strong"> </i> yodahtest2@gmail.com</li>
										<li><i className="pe-7s-call strong"> </i> +56 312 456 7890</li>
									</ul>
								</div>
							</div>
							<div className="col-md-3 col-sm-6 wow fadeInRight animated">
								<div className="single-footer">
									<h4>Enlaces rápidos </h4>
									<div className="footer-title-line" />
									<ul className="footer-menu">
										{
											 items && items.map(
											(item, key) => <li className="wow fadeInUp animated" data-wow-delay="1s" key={key}>
											 <Link  to={item.url}>{item.title}</Link></li>
											)
										}
									</ul>
								</div>
							</div>
							<div className="col-md-3 col-sm-6 wow fadeInRight animated">
					<div className="single-footer">
						<h4>Mejor votados</h4>
						<div className="footer-title-line" />
							<ul className="footer-blog">
												
							</ul>
					</div>
				</div>
							<div className="col-md-3 col-sm-6 wow fadeInRight animated">
								<div className="single-footer news-letter">
									<h4>Suscribase</h4>
									<div className="footer-title-line" />
										<p>Lorem ipsum dolor sit amet, nulla  suscipit similique quisquam molestias. Vel unde, blanditiis.</p>
									<div className="social pull-right"> 
										<ul>
											<li><a className="wow fadeInUp animated" href="/"><i className="fa fa-twitter" /></a></li>
											<li><a className="wow fadeInUp animated" href="/" data-wow-delay="0.2s"><i className="fa fa-facebook" /></a></li>
											<li><a className="wow fadeInUp animated" href="/" data-wow-delay="0.3s"><i className="fa fa-google" /></a></li>
										</ul> 
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="footer-copy text-center">
					<div className="container">
						<div className="row">
							<div className="pull-left">
								<span> (C) <a href="/">MAFE</a> , Todos los derechos reservados 2018</span> 
							</div> 
							<div className="bottom-menu pull-right"> 
								<ul> 
									 {
										 items && items.map(
											(item, key) => <li className="wow fadeInUp animated" data-wow-delay="1.5s" key={key}>
												<Link  to={item.url}>{item.title}</Link></li>
											)
									}
								</ul> 
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Footer;
