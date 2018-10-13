import React from "react";
import { Switch, BrowserRouter as Router,Route,Redirect} from "react-router-dom";
import Inicio from '../Inicio';
import Materias from '../Materias';
import Docentes from '../Docentes';
import Recursos from '../Recursos';
import CrearRecurso from '../Recursos/CrearRecurso';
import Contacto from '../Contacto';
import Login from '../Login';
import Register from '../Login/Registerform';
import Page404 from '../Page404';
import store from '../../store';
const PrivateRoute = ({ component: Component, ...rest }) => (

  <Route {...rest} render={(props) => (
     
    store.getState().aut === true
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
)
const Content = () => (

  <content>
    <Switch>
      <Route exact path="/" component={Inicio} /> 
      <Route  path="/materias" component={Materias}/>
      <Route  path="/docentes" component={Docentes}/>
      <Route  path="/recursos" component={Recursos}/>
      <PrivateRoute  path="/crearrecurso" component={CrearRecurso}/>
      <Route exact path="/contacto" component={Contacto}/>
      <Route exact path="/login" component={Login}/>
      <Route exact path="/Register" component={Register}/>
      <Route component={Page404} />
    </Switch>
  </content>
);
export default Content;