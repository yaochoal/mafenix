import ApolloClient from 'apollo-boost';
export const client = new ApolloClient({
  uri: `http://192.168.0.12:5500/graphql`
});