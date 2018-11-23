import React from 'react';
import image from "./book.png"
import {client} from '../utils/graphQLUtils';
import gql from "graphql-tag";
import { View, FlatList, ActivityIndicator,TouchableOpacity,Text,StyleSheet,Image,Dimensions } from "react-native";
import { ListItem, SearchBar } from "react-native-elements";
import {Router, Stack, Scene, Actions} from 'react-native-router-flux';
import store from "../../store";
import {Container,Header,Title,Content,Button,Icon,Card,CardItem,Thumbnail,Left,Right,Body,Spinner} from "native-base";
import Chart from 'react-native-chartjs';



///////COMPONENTE QUE MANEJA LA VENTANA INDIVIDUAL Y LA GLOBAL/////////
/*
export default class Nav2 extends React.Component {
  render() {
      return (
        <Router>
        <Stack key="root" hideNavBar={true}>
          <Scene key="Courses" component={Courses} title="Materias" initial={true}  />
          <Scene key="Course" component={Course} title="Materia" />
        </Stack>
     </Router>
      );
    }
}
*/

//////////////COMPONENTE QUE MANEJA LAS ESTADISTICAS///////////////////////
class Grafico extends React.Component {
	constructor(props){
		super(props)
		this.state ={
			value : 1,
      data: [],
      loading: true 
		}
  }
  async componentWillMount(){
    //console.log(this.props.post_id)
    await client.query({
			query: gql`
      query{
        scoreresourceByService(scoreresource:{
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
			//console.log(data.data.scoreresourceByService)
			this.setState({ data: data.data.scoreresourceByService})
		  })
      .catch(error => console.error(error));
      this.setState({ loading: false });
  }

	render(){
    if(this.state.loading){
      return (
        <View style={{alignItems: 'center',justifyContent: 'center', flex:1}} >
           <Spinner color="orange" />
           </View>
       );
    }else{
    const chartConfiguration1 = {
      type: 'bar',
      data: {
        labels: ["Malo", "Regular", "Medio", "Bueno", "Excelente"],
        datasets: [{
          label: '# de Votos',
          data: [this.state.data.malo, 
                 this.state.data.regular,
                 this.state.data.medio,
                 this.state.data.bueno,
                 this.state.data.excelente],
          backgroundColor: [
            '#FF6384',
            '#FFCE56',
            '#E7E9ED',
            '#4BC0C0',
            '#36A2EB',
          ],
          borderColor: [
            '#FF6384',
            '#FFCE56',
            '#E7E9ED',
            '#4BC0C0',
            '#36A2EB',
          ],
          borderWidth: 1
        }]
      },
      options: {
        maintainAspectRatio : false,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
  }; 
		return(
        <View style = {{ height:300,width:"100%"}}>    
         <Chart chartConfiguration = {
            chartConfiguration1
          }
       defaultFontSize={20}/>  
      </View> 
			);
	}
}
}
////////////COMPONENTE QUE MANEJA LOS COMENTARIOS/////////////////////
class Comentarios extends React.Component {
  constructor(){
		super()
		this.state ={
      data_a:[],
      loading: true
		}
	}
  async componentWillMount(){
		//console.log(this.props.recurso);
		//console.log(this.props.post_id);
		 await	client.query({
				query: gql`
				query{
					commentByService(comment:{
					  service: "${this.props.recurso}"
					  service_id: ${this.props.post_id}
					}){
					  id
					  comment
					  service
					  service_id
					  user_id
					  created_at
					}
				  }`
			  })
			  .then(data => {
				//console.log(data.data.commentByService)
				this.setState({ data_a: data.data.commentByService})
			  })
        .catch(error => console.error(error));
        this.setState({ loading: false });
	}
  render() {
      if(this.state.loading){
        return (
          <View style={{alignItems: 'center',justifyContent: 'center', flex:1}} >
             <Spinner color="orange" />
             </View>
         );
      }else{
        return (
          <View>
            {this.state.data_a.map((comentario)=>{return(<Comentario key={comentario.id} comentario={comentario}/>)})}
          </View>
        );

      }
    }
}
////////////Componente de renderizado de comentario individual///////////
class Comentario extends React.Component {
  constructor(){
		super()
		this.state ={
      data_a:[],
      loading: true
		}
	}
	async componentWillMount(){
	 await	client.query({
			query: gql`
			query{
				userById(id:"${this.props.comentario.user_id}"){
				  name
				  avatar
				}
			  }`
		  })
		  .then(data => {
			this.setState({ data_a: data.data.userById})
		  })
      .catch(error => console.error(error));
      this.setState({loading:false});
  }
  
  render(){
    if(this.state.loading){
            return(<View style={{alignItems: 'center',justifyContent: 'center', flex:1}} >
            <Spinner color="orange" />
         </View>);
    }else{
      return(
        <Content padder>
        <Card style={styles.mb}>
          <CardItem bordered>
            <Left>
              <Thumbnail source={{uri:`${this.state.data_a.avatar}`}} />
              <Body>
                <Text>{this.state.data_a.name}</Text>
                <Text note>{this.props.comentario.created_at}</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem>
            <Body>
              <Text>
              {this.props.comentario.comment}
              </Text>
            </Body>
          </CardItem>
        </Card>
      </Content>
      );
    }
  }
}
///////COMPONENTE QUE MUESTRA EL CURSO INDIVIDUAL//////////////////////
export class Course extends React.Component {
  constructor() {
		super()
		this.state = { data_a: [],loading: true }
  }
//////////////////////OBTENIENDO DATOS DEL CURSO//////////////////////////
  async componentWillMount(){
		await client.query({
			query: gql`
			query{
				courseById(id:${this.props.id}){
				  id
				  name
				  description
				  code
				  teacher_has_courses {
					id
					teacher_id
					teacher_name
					teacher_description
					course_id
					course_name
					course_description
					course_code
				  }
				  course_has_resources {
					id
					resource_id
					resource_name
					resource_description
					resource_link
					course_id
					course_name
					course_description
					course_code
				  }
				}
			  }`
		  })
		  .then(data => {
			//console.log(data.data.courseById)
			this.setState({ data_a: data.data.courseById})
		  })
      .catch(error => console.error(error));
      this.setState({ loading: false });
  }
  
  
  render() {
    if (this.state.loading) {
      return (
       <View style={{alignItems: 'center',justifyContent: 'center', flex:1}} >
          <Spinner color="orange" />
          </View>
      );
    }else{
      return (
        <View style={{flex:1}}>
        <Container style={styles.container1}>
        <Header androidStatusBarColor='orange' >
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
         
            <Title>Materia</Title>
           
          </Body>
          <Right />
        </Header>

        <Content  style={{width:"100%",height:"100%"}}>
          <Card style={styles.mb}>
            <CardItem bordered>
              <Left>
                <Thumbnail source={image} />
                <Body>
                  <Text>{this.state.data_a.name}</Text>
                  <Text note>{this.state.data_a.code}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Body>
               {/*espacio para los pdsfs  */}
                <Text>
                {this.state.data_a.description}
                </Text>
              </Body>
            </CardItem>
            <CardItem style={{ paddingVertical: 0 }}>
              <Left>
                <Button transparent>
                  <Icon name="logo-github" />
                  <Text>{this.state.data_a.id} stars</Text>
                </Button>
              </Left>
            </CardItem>
          </Card>
          <Title style={{color:'black'}}>Estadísticas:</Title>
          <Grafico recurso="courses" post_id={this.state.data_a.id}/>
          <Title style={{color:'black'}}>Comentarios:</Title>
          <Comentarios recurso="courses" post_id={this.state.data_a.id}/>
        </Content>
      </Container>  
      </View>
      );
    }
  }
}
const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: '#fff',
  alignItems: 'center',
  justifyContent: 'center',
},
container1: {
  backgroundColor: "#FFF",
},
mb: {
  marginBottom: 15
}
});

///////// COMPONENTE QUE DA EL LISTADO DE LOS CURSOS//////////////
export default class Courses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
      page: 1,
      error: null,
      refreshing: false,
      name: "lsasdad"
    };
    /*
    store.subscribe(() => {
      this.setState({
        name: store.getState().username
      });
    });
    */
  }
  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    //console.log(this.state.page)
    if(this.state.page <= 3){
    const { page } = this.state;
    this.setState({ loading: true });
      client.query({
        query: gql`query{
          allCourses(page:${page}){
            id
            name
            description
            code
          }
        }
        `
      }).then(res => {
               ///codigo
               //console.log(res.data.allCourses);
               this.setState({
                data: page === 1 ? res.data.allCourses : [...this.state.data, ...res.data.allCourses],
                error: res.error || null,
                loading: false,
                refreshing: false
              });
      })
      .catch(error => {
          console.log(error);
          this.setState({ error, loading: false });
        });
      }
  };


  handleRefresh = () => {
    if(this.state.page <= 3){
    this.setState(
      {
        page: 1,
        seed: this.state.seed + 1,
        refreshing: true
      },
      () => {
        this.makeRemoteRequest();
      }
    );
  }
  };

  handleLoadMore = () => {
    if(this.state.page <= 3){
    this.setState(
      {
        page: this.state.page + 1
      },
      () => {
        this.makeRemoteRequest();
      }
    );
    }
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%"
        }}
      />
    );
  };

  renderHeader = () => {
    return <SearchBar placeholder="Buscar..." lightTheme round />;
  };

  renderFooter = () => {
    if (!this.state.loading) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  render() {
    return (
      <View>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <TouchableOpacity
            activeOpacity={0.8}
            onPress={()=> Actions.Course({nombre: item.name, id: item.id})}
            >
            <ListItem
              roundAvatar
              title={`${item.name} ${item.code}`}
              subtitle={item.description}
              avatar={ image}
              containerStyle={{ borderBottomWidth: 0 }}
            />
            </TouchableOpacity>
          )}
          keyExtractor={item => `${item.id}`}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
          ListFooterComponent={this.renderFooter}
          onRefresh={this.handleRefresh}
          refreshing={this.state.refreshing}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={50}
        />
      </View>
    );
  }
}