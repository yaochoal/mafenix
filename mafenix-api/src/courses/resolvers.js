import { generalRequest, getRequest } from '../utilities';
import { url, port, entryPoint } from './server';

const URL = `http://${url}:${port}/${entryPoint}`;

const resolvers = {
	Query: {
		allCourses1: (_) =>
			getRequest(`${URL}1`, ''),
		allCourses: (_, { page }) =>
			getRequest(`${URL}?page=${page}`, ''),
		courseById: (_, { id }) =>
			generalRequest(`${URL}/${id}`, 'GET'),
		courseByName: (_,{course})=>
			generalRequest(`http://${url}:${port}/search`,'POST',course),
	},
	Mutation: {
		createCourse: (_, { course }) =>
			generalRequest(`${URL}`, 'POST', course),
		updateCourse: (_, { id, course }) =>
			generalRequest(`${URL}/${id}`, 'PUT', course),
		deleteCourse: (_, { id }) =>
			generalRequest(`${URL}/${id}`, 'DELETE')
	}
};

export default resolvers;
