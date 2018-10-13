import React, { Component } from 'react';
//Assets
import ApolloClient from 'apollo-boost';
import gql from "graphql-tag";
const client = new ApolloClient({
	uri: "http://192.168.99.101:5500/graphql"
  });


class Comentario extends Component {
	constructor(){
		super()
		this.state ={
			data_a:[]
		}
	}
	componentWillMount(){
		client.query({
			query: gql`
			query{
				userById(id:"${this.props.user_id}"){
				  name
				  avatar
				}
			  }`
		  })
		  .then(data => {
			this.setState({ data_a: data.data.userById})
		  })
		  .catch(error => console.error(error));
	}
	render(){
		
			return(
				<div className="row comment">
				
					<div className="col-sm-3 col-md-2 text-center-xs">
						<p>
							<img src={this.state.data_a.avatar} className="img-responsive img-circle" alt="" />
						</p>
					</div>
					<div className="col-sm-9 col-md-10">
						<h6 className="text-uppercase"><a>{this.state.data_a.name}</a></h6>
						<p className="posted"><i className="fa fa-clock-o" />{this.props.created_at}</p>
						<p>{this.props.comment}</p>
						<div className="property-icon">
						</div>	
					</div>
					
				</div>
			
				);
		}
	}


export default Comentario;