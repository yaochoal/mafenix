// Dependencies
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';


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


//render(<div><ApolloProvider client={client}><Router><App /></Router></ApolloProvider></div>,document.getElementById('root'));
render(<div><Router><App /></Router></div>,document.getElementById('root'));
registerServiceWorker();
