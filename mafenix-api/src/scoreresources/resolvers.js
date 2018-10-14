import { generalRequest, getRequest } from '../utilities';
import { url, port, entryPoint } from './server';

const URL = `http://${url}:${port}/${entryPoint}`;

const resolvers = {
	Query: {
		allScoreResources: (_) =>
			getRequest(`${URL}/`, 'GET'),
		scoreresourceById: (_, { _id }) =>
			generalRequest(`${URL}/${_id}/`, 'GET'),
		scoreresourceByService: (_,{scoreresource})=>
			generalRequest(`http://${url}:${port}/search/`,'POST',scoreresource),
	},
	Mutation: {
		createScoreResource: (_, { scoreresource }) =>
			generalRequest(`${URL}/`, 'POST', scoreresource),
		deleteScoreResource: (_, { _id, scoreresource }) =>
			generalRequest(`${URL}/${_id}/`, 'PUT', scoreresource),
		updateScoreResource: (_, { _id }) =>
			generalRequest(`${URL}/${_id}/`, 'DELETE'),
	}
};

export default resolvers;
