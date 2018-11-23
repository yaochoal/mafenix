import { generalRequest, getRequest } from '../utilities';
import { url, port, entryPoint } from './server';

const URL = `http://${url}:${port}/${entryPoint}`;

const resolvers = {
	Query: {
		allTeachers1: (_) =>
			getRequest(`${URL}1`, ''),
		allTeachers: (_,{ page }) =>
			getRequest(`${URL}?page=${page}`, ''),
		teacherById: (_, { id }) =>
			generalRequest(`${URL}/${id}`, 'GET'),
		teacherByName: (_,{teacher})=>
			generalRequest(`http://${url}:${port}/search`,'POST',teacher),
	},
	Mutation: {
		createTeacher: (_, { teacher }) =>
			generalRequest(`${URL}`, 'POST', teacher),
		updateTeacher: (_, { id, teacher }) =>
			generalRequest(`${URL}/${id}`, 'PUT', teacher),
		deleteTeacher: (_, { id }) =>
			generalRequest(`${URL}/${id}`, 'DELETE')
	}
};

export default resolvers;
