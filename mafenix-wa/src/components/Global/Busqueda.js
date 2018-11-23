import React, { Component } from 'react';
import swal from 'sweetalert2';

//graphql
import ApolloClient from 'apollo-boost';
import gql from "graphql-tag";


import baseURL from "../../url"
const client = new ApolloClient({
  uri: `${baseURL}`
});



class Busqueda extends Component {
	constructor() {
    super()
    this.state = {  value: "teacher", texto: ""}
  }

  cambiarEstado=(e)=>{
      if(e.target.id==="basic"){
      this.setState({value: e.target.value});
      }

      if(e.target.id==="texto"){
        console.log(e.target.value)
      this.setState({texto: e.target.value});
      }
  }
  realizarBusqueda=(e)=>{
		if(this.state.value==="teacher"){
      client.query({
        query: gql`
        query{
          teacherByName(teacher:{
            teacher_name: "${this.state.texto}" 
          }){
            id
            name
            description
          }
        }
        `
      })
      .then(data => {
        //console.log(data.data.teacherByName);
        window.location.replace(`docentes/${data.data.teacherByName[0].id}`);
      })
      .catch(error => {console.error(error)
        swal("Ningun dato encontrado",'','error'); 
      });
     
    }
      
    if(this.state.value==="resource"){
      client.query({
        query: gql`
        query{
          resourceByName(resource:{
            resource_name: "${this.state.texto}" 
          }){
            id
            name
            description
            created_at
          }
        }`
      })
      .then(data => {
       // console.log(data.data.resourceByName);
       window.location.replace(`recursos/${data.data.resourceByName[0].id}`);
      })
      .catch(error => {console.error(error)
        swal("Ningun dato encontrado",'','error'); });
      
    }
      
    if(this.state.value==="course"){
      client.query({
        query: gql`
        query{
          courseByName(course:{
            course_name: "${this.state.texto}" 
          }){
            id
            name
            description
            code
          }
        }`
      })
      .then(data => {
        //console.log(data.data.courseByName);
        window.location.replace(`materias/${data.data.courseByName[0].id}`);
      })
      .catch(error => {console.error(error)
        swal("Ningun dato encontrado",'','error'); });
      
    }
  }
	render(){
		
		return(
			
					<div className="panel panel-default sidebar-menu wow fadeInRight animated" >
						<div className="panel-heading">
							<h3 className="panel-title">Busqueda</h3>
						</div>
						<div className="panel-body search-widget">
							<div action="" className=" form-inline"> 
								<fieldset>
									<div className="row">
										<div className="col-xs-12">
											<input type="text" id="texto" onChange={this.cambiarEstado} value={this.state.text} className="form-control" placeholder="Buscar..."/>
										</div>
									</div>
								</fieldset>

								<fieldset>
									<div className="row">
										<div className="col-xs-6">
										<label >Tipo de busqueda:</label>
										<select id="basic" className="selectpicker show-tick form-control" onChange={this.cambiarEstado} >
                     				    <option value ="teacher">Docentes</option>
                      					<option value ="course">Materias</option>
                                        <option value ="resource">Recursos</option>
                                        </select>
										</div>
										<div className="col-xs-6">
										
										</div>
									</div>
								</fieldset>

								
								<fieldset >
									<div className="row">
										<div className="col-xs-12">  
											<input className="button btn largesearch-btn" onClick={this.realizarBusqueda} value="Buscar" type="submit" />
										</div>  
									</div>
								</fieldset>
							</div>
						</div>
					</div>

			
		);
	}
}

export default Busqueda;