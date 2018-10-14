// Dependencies
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import firebase from 'firebase'
// Routes
import App from './components/App';

// Assets
import './index.css';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
  uri: "http://localhost:5500/graphql"
});

firebase.initializeApp({
	apiKey: "AIzaSyD4YsB7cophC2mO6vmrvaTXftGEuW3Sj70",
    authDomain: "mafe-app.firebaseapp.com",
    databaseURL: "https://mafe-app.firebaseio.com",
    projectId: "mafe-app",
    storageBucket: "mafe-app.appspot.com",
    messagingSenderId: "504533869340"
})
render(
  <ApolloProvider client={client}>
  <Router>
    <App />
  </Router>
  </ApolloProvider>,
  document.getElementById('root')
);
