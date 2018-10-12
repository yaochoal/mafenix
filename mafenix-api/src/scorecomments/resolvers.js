import { generalRequest, getRequest } from '../utilities';
import { url, port, entryPoint } from './server';

const URL = `http://${url}:${port}/${entryPoint}`;

const resolvers = {
	Query: {
		allScoreComments: (_) =>
			getRequest(`${URL}/`, 'GET'),
		scorecommentById: (_, { _id }) =>
			generalRequest(`${URL}/${_id}/`, 'GET'),
		scorecommentByService: (_,{scorecomment})=>
			generalRequest(`http://${url}:${port}/search/`,'POST',scorecomment),
	},
	Mutation: {
		createScoreComment: (_, { scorecomment }) =>
			generalRequest(`${URL}/`, 'POST', scorecomment),
		deleteScoreComment: (_, { _id, scorecomment }) =>
			generalRequest(`${URL}/${_id}/`, 'PUT', scorecomment),
		updateScoreComment: (_, { _id }) =>
			generalRequest(`${URL}/${_id}/`, 'DELETE'),
	}
};

export default resolvers;
