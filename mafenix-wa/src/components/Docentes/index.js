// Dependencias
import React from 'react';

//Componentes
import Listado from './Listado.js';
import Individual from './Individual.js';
//import baseURL from '../../url';
import { Switch, Route } from "react-router-dom";

const Index = ({ match }) => (
	<Switch>
		<Route exact path={`${match.url}`} component={Listado} />
		<Route path={`${match.url}/:id`} component={Individual} />
	</Switch>
);

export default Index;