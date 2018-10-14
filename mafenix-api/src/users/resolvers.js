import { generalRequest, getRequest, generalRequest1 } from '../utilities';
import { url, port, entryPoint } from './server';

const URL = `http://${url}:${port}/${entryPoint}`;

const resolvers = {
	Query: {
		allUsers: (_) =>
			getRequest(`${URL}`, 'GET'),
		userById: (_, { id }) =>
			generalRequest(`${URL}/${id}`, 'GET'),
		userToken: (_, { user }) =>
			generalRequest(`http://${url}:${port}/get-token`, 'POST', user),
		userInfo: (_,{ token }) =>
		    generalRequest1(`http://${url}:${port}/user`, 'GET',_,token.token)
	},
	Mutation: {
		createUser: (_, { user }) =>
			generalRequest(`${URL}`, 'POST', user),
		updateUser: (_, { id, user }) =>
			generalRequest(`${URL}/${id}`, 'PUT', user),
		deleteUser: (_, { id }) =>
			generalRequest(`${URL}/${id}`, 'DELETE'),
	}
};

export default resolvers;
