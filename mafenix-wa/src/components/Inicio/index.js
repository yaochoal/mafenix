// Dependencies
import React, { Component } from 'react';
import { logPageView } from '../../analytics';
import swal from 'sweetalert2';

//graphql
import ApolloClient from 'apollo-boost';
import gql from "graphql-tag";
import baseURL from "../../url"
const client = new ApolloClient({
  uri: `${baseURL}`
});


class Inicio extends Component {
  constructor() {
    super()
    this.state = {  value: "teacher", texto: "",name:"BUSCA INFORMACIÓN DE TUS DOCENTES, RECURSOS Y MATERIAS!"}
    logPageView();
  }
  componentWillMount(){
   
}

  cambiarEstado=(e)=>{
      if(e.target.id==="basic"){
      this.setState({value: e.target.value});
      }

      if(e.target.id==="texto"){
        //console.log(e.target.value)
      this.setState({texto: e.target.value});
      }
  }
  realizarBusqueda=(e)=>{
   // console.log(this.state)
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
  render() {

    return (
      <div className="slider-area">
     
        <div className="slider">
          <div id='bg-slider' className="owl-carousel owl-theme">
            <div className="item"><img src="assets/img/slider-image-1.jpg" alt="imagen1" /></div>
            <div className="item"><img src="assets/img/slider-image-2.jpg" alt="imagen2" /></div>
            <div className="item"><img src="assets/img/slider-image-1.jpg" alt="imagen3" /></div>
          </div>
        </div>

        <div className="slider-content">

          <div className="row">

            <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1 col-sm-12">

              <h2>{this.state.name}</h2>

              <div className="search-form wow pulse" data-wow-delay="0.8s">

                <div  className=" form-inline">
                  <div className="form-group">
                    <input id="texto" type="text" className="form-control" onChange={this.cambiarEstado} value={this.state.text} placeholder="Buscar" />
                  </div>
                  <div className="form-group">                                     
                    <select id="basic" className="selectpicker show-tick form-control" onChange={this.cambiarEstado} >
                      <option value ="teacher">Docentes</option>
                      <option value ="course">Materias</option>
                      <option value ="resource">Recursos</option>
                    </select>
                  </div>
                  <button className="btn search-btn" onClick={this.realizarBusqueda}><i className="fa fa-search" /></button>
                  <button className="btn search-btn prop-btm-sheaerch" ><i className="fa fa-search" /></button> 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Inicio;
