import { generalRequest, getRequest} from '../utilities';
import { url, port, entryPoint } from './server';
const { createWriteStream } = require("fs");
const URL = `http://${url}:${port}/${entryPoint}`;

const storeUpload = ({ stream, filename }) =>
  new Promise((resolve, reject) =>
    stream
      .pipe(createWriteStream(filename))
      .on("finish", () => resolve())
      .on("error", reject)
  );

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
		uploadFile: async (parent, { file }) => {
      		const { stream, filename } = await file;
      	//await generalRequest2(`${URL}`, 'POST', file)
      	await storeUpload({ stream, filename });
      	console.log(file)
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
