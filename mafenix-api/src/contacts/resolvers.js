import { generalRequest, getRequest } from '../utilities';
import { url, port, entryPoint } from './server';

const URL = `http://${url}:${port}/${entryPoint}`;

const resolvers = {
	Query: {
		allContacts: (_) =>
			getRequest(`${URL}`, ''),
		contactById: (_, { id }) =>
			generalRequest(`${URL}/${id}`, 'GET'),
	},
	Mutation: {
		createContact: (_, { contact }) =>
			generalRequest(`${URL}`, 'POST', contact),
		updateContact: (_, { id, contact }) =>
			generalRequest(`${URL}/${id}`, 'PUT', contact),
		deleteContact: (_, { id }) =>
			generalRequest(`${URL}/${id}`, 'DELETE')
	}
};

export default resolvers;
