import { generalRequest, getRequest } from '../utilities';
import { url, port, entryPoint } from './server';

const URL = `http://${url}:${port}/${entryPoint}`;

const resolvers = {
	Query: {
		allResources: (_,{ page }) =>
			getRequest(`${URL}?page=${page}`, ''),
		resourceById: (_, { id }) =>
			generalRequest(`${URL}/${id}`, 'GET'),
	},
	Mutation: {
		createResource: (_, { resource }) =>
			generalRequest(`${URL}`, 'POST', resource),
		updateResource: (_, { id, resource }) =>
			generalRequest(`${URL}/${id}`, 'PUT', resource),
		deleteResource: (_, { id }) =>
			generalRequest(`${URL}/${id}`, 'DELETE')
	}
};

export default resolvers;
