// Dependencias
import React, { Component } from 'react';
import { Polar} from 'react-chartjs-2';
import store from '../../store';
import swal from 'sweetalert2';
import ApolloClient from 'apollo-boost';
import gql from "graphql-tag";

const client = new ApolloClient({
  uri: "http://192.168.99.101:5500/graphql"
});

//Assets


class Grafico extends Component {
	constructor(props){
		super(props)
		this.state ={
			value : 1,
      data: []
		}
    
	}
  componentWillMount(){
    client.query({
			query: gql`
      query{
        scorecommentByService(scorecomment:{
          service: "${this.props.recurso}"
          service_id: ${this.props.post_id}
        }){
          malo
          regular
          medio
          bueno
          excelente
        }
      }`
		  })
		  .then(data => {
			//console.log(data.data.courseById)
			this.setState({ data: data.data.scorecommentByService})
		  })
		  .catch(error => console.error(error));
  }
 cambiarEstado=(e)=>{  
      this.setState({value: e.target.value});
  }
  calificar=(e)=>{
    /*
  		let axiosConfig = {headers: {'Content-Type': 'application/json;'}};
          axios.post(`${baseURL}/scores`, {
         [this.props.type]: this.props.data.id,
         positive: this.state.value,
         user_id: store.getState().id
      	 }, axiosConfig)
       	.then(function (response) {
      	 //  this.setState({response});
      	 swal("Su calificacion ha sido completada",'','success');
         console.log(response)
      	  //setTimeout(function(){document.location.reload()},1000);
        })
        .catch(function (error) {
          swal("Ya ha hecho una calificación",'','error');
        console.log(error);
       });
         fetch(`${baseURL}/${this.props.valor}/${this.props.post_id}`)
      .then((response) => {
        return response.json()
      })
      .then((data) => {
       if(this.props.valor === "resources"){
       this.setState({ data: data})
       }
       if(this.props.valor === "teachers"){
       this.setState({ data: data})
       }
       if(this.props.valor ===  "courses"){
       this.setState({ data: data})
       }
      })
       fetch(`${baseURL}/${this.props.valor}/${this.props.post_id}`)
      .then((response) => {
        return response.json()
      })
      .then((data) => {
       if(this.props.valor === "resources"){
       this.setState({ data: data})
       }
       if(this.props.valor === "teachers"){
       this.setState({ data: data})
       }
       if(this.props.valor ===  "courses"){
       this.setState({ data: data})
       }
      })
      */
  }
	render(){

const polar = {

  datasets: [
    {
      data: [
        this.state.data.malo,
        this.state.data.regular,
        this.state.data.medio,
        this.state.data.bueno,
        this.state.data.excelente,
      ],
      backgroundColor: [
        '#FF6384',
        '#FFCE56',
        '#E7E9ED',
        '#4BC0C0',
        '#36A2EB',
      ],
      label: 'My dataset' // for legend
    }],
  labels: [
    'Malo',
    'Regular',
    'Medio',
    'Bueno',
    'Excelente',
  ],
};
	if(localStorage.getItem('jwtToken')){
		return(
					<div >
					<h4 className="s-property-title">Estadisticas: </h4>
						<Polar data={polar} />
						<div >
					<h4 className="s-property-title">Tu calificación: </h4>
                                      <div className="form-group"style={{maxWidth: 300}}>                                     
                    <select id="basic" className="selectpicker show-tick form-control" onChange={this.cambiarEstado} >
                      <option value ={1}>Malo</option>
                      <option value ={2}>Regular</option>
                      <option value ={3}>Medio</option>
                      .<option value ={4}>Bueno</option>
                      <option value ={5}>Excelente</option>
                    </select>

                  </div>
                  <button type="submit" id="next" className="btn btn-primary"onClick={this.calificar}> Calificar</button>
                                    </div>
			</div>	

		);
	}else{
		return(<div>
					<h4 className="s-property-title">Estadisticas: </h4>
						<Polar data={polar} />
						</div>

			);
	}
	}
}

export default Grafico;