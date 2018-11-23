// Dependencies
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import firebase from 'firebase'

// Routes
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
//import { createUploadLink } from 'apollo-upload-client';
//import { ApolloClient,  } from 'apollo-client';
//import { InMemoryCache } from 'apollo-cache-inmemory';
//import { ApolloProvider } from "react-apollo";

//const link = createUploadLink({ uri: 'http://localhost:4000' });
//const link = createUploadLink({ uri: 'http://localhost:5500/graphql' });
//const link = createUploadLink({ uri: 'http://192.168.99.101:5500/graphql' });
//const client = new ApolloClient({
//  link,
//  cache: new InMemoryCache(),
//});

firebase.initializeApp({
	apiKey: "AIzaSyD4YsB7cophC2mO6vmrvaTXftGEuW3Sj70",
    authDomain: "mafe-app.firebaseapp.com",
    databaseURL: "https://mafe-app.firebaseio.com",
    projectId: "mafe-app",
    storageBucket: "mafe-app.appspot.com",
    messagingSenderId: "504533869340"
})
//render(<div><ApolloProvider client={client}><Router><App /></Router></ApolloProvider></div>,document.getElementById('root'));
render(<div><Router><App /></Router></div>,document.getElementById('root'));
registerServiceWorker();
