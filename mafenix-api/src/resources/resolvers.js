import { generalRequest, getRequest, generalRequest2} from '../utilities';
import { url, port, entryPoint } from './server';

const URL = `http://${url}:${port}/${entryPoint}`;

const resolvers = {
	Query: {
		allResources: (_,{ page }) =>
			getRequest(`${URL}?page=${page}`, ''),
		resourceById: (_, { id }) =>
			generalRequest(`${URL}/${id}`, 'GET'),
		resourceByName: (_,{resource})=>
			generalRequest(`http://${url}:${port}/search`,'POST',resource)
	},
	Mutation: {
		uploadFile: async (_, { file }) => {
      	const { stream, filename } = await file;
      	console.log(file);
      	return true;
    	},
		createResource: (_, { resource }) =>
			generalRequest(`${URL}`, 'POST', resource),
		updateResource: (_, { id, resource }) =>
			generalRequest(`${URL}/${id}`, 'PUT', resource),
		deleteResource: (_, { id }) =>
			generalRequest(`${URL}/${id}`, 'DELETE')
	}
};

export default resolvers;
