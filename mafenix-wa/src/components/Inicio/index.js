// Dependencies
import React, { Component } from 'react';
import axios from 'axios';
import baseURL from '../../url';
import { logPageView } from '../../analytics';
import firebase from 'firebase';
import swal from 'sweetalert2';
class Inicio extends Component {
  constructor() {
    super()
    this.state = {  value: "teacher", texto: "",name:"BUSCA INFORMACIÓN DE TUS DOCENTES, RECURSOS Y MATERIAS!"}
    logPageView();
  }
  componentWillMount(){
   const nameRef = firebase.database().ref().child('titulo')
   nameRef.on('value', snapshot => {
    this.setState({
    name: snapshot.val()
   })
  })
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
   // console.log(this.state)
    var ruta = "";
    if(this.state.value==="teacher")
      ruta = "docentes";
    if(this.state.value==="resource")
      ruta = "recursos";
    if(this.state.value==="course")
      ruta = "materias";
     let axiosConfig = {headers: {'Content-Type': 'application/json;'}};
        axios.post(`${baseURL}/search`, {
         [`${this.state.value}_name`]: this.state.texto,
         likes: 0
       }, axiosConfig)
       .then(function (response) {
        
        console.log(response.data[0].id)
        window.location.replace(`${ruta}/${response.data[0].id}`);
       //  this.setState({response.data.id});
        })
        .catch(function (error) {
          swal("Ningun dato encontrado",'','error'); 
        console.log(error);
       });
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
