'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var merge = _interopDefault(require('lodash.merge'));
var GraphQLJSON = _interopDefault(require('graphql-type-json'));
var graphqlTools = require('graphql-tools');
var request = _interopDefault(require('request-promise-native'));
require('graphql');
var apolloServer = require('apollo-server');
var graphqlYoga = require('graphql-yoga');

/**
 * Creates a request following the given parameters
 * @param {string} url
 * @param {string} method
 * @param {string} token
 * @param {object} [body]
 * @param {object} [auth]
 * @param {boolean} [fullResponse]
 * @return {Promise.<*>} - promise with the error or the response object
 */
async function generalRequest1(url, method, body, token, fullResponse) {
	const parameters = {
		method,
		uri: encodeURI(url),
		body,
		auth: {'bearer':token},
		json: true,
		resolveWithFullResponse: fullResponse
	};
	if (process.env.SHOW_URLS) {
		// eslint-disable-next-line
		console.log(url);
	}
	try {
		return await request(parameters);
	} catch (err) {
		return err;
	}
}

async function generalRequest(url, method, body, fullResponse) {
	const parameters = {
		method,
		uri: encodeURI(url),
		body,
		json: true,
		resolveWithFullResponse: fullResponse
	};
	if (process.env.SHOW_URLS) {
		// eslint-disable-next-line
		console.log(url);
	}
	try {
		return await request(parameters);
	} catch (err) {
		return err;
	}
}

/**
 * Adds parameters to a given route
 * @param {string} url
 * @param {object} parameters
 * @return {string} - url with the added parameters
 */
function addParams(url, parameters) {
	//let queryUrl = `${url}?`;
	let queryUrl = `${url}`;
	for (let param in parameters) {
		// check object properties
		if (
			Object.prototype.hasOwnProperty.call(parameters, param) &&
			parameters[param]
		) {
			if (Array.isArray(parameters[param])) {
				queryUrl += `${param}=${parameters[param].join(`&${param}=`)}&`;
			} else {
				queryUrl += `${param}=${parameters[param]}&`;
			}
		}
	}
	return queryUrl;
}

/**
 * Generates a GET request with a list of query params
 * @param {string} url
 * @param {string} path
 * @param {object} parameters 
 * @return {Promise.<*>}
 */
function getRequest(url, path, parameters) {
	//const queryUrl = addParams(`${url}/${path}`, parameters);
	const queryUrl = addParams(`${url}`, parameters);
	return generalRequest(queryUrl, 'GET');
}

/**
 * Merge the schemas in order to avoid conflicts
 * @param {Array<string>} typeDefs
 * @param {Array<string>} queries
 * @param {Array<string>} mutations
 * @return {string}
 */
function mergeSchemas(typeDefs, queries, mutations) {
	return `${typeDefs.join('\n')}
    type Query { ${queries.join('\n')} }
    type Mutation { ${mutations.join('\n')} }`;
}

const coursesTypeDef = `
type Course {
    id: Int!
    name: String!
    description: String!
    code: Int!
    teacher_has_courses: [Teacher_has_courses]
    course_has_resources: [Courses_has_resources]   
}
type Teacher_has_courses{
    id: Int!
    teacher_id: Int!
    teacher_name: String!
    teacher_description: String!
    course_id: Int!
    course_name: String!
    course_description: String!
    course_code: Int!
}
type Courses_has_resources{
    id: Int!
    resource_id: Int!
    resource_name: String!
    resource_description: String!
    resource_link: String!
    course_id: Int!
    course_name: String!
    course_description: String!
    course_code: Int!
}

input CourseInput {
    name: String!
    description: String!
    code: Int!
}
input CourseSearch {
    course_name: String!
}`;

const coursesQueries = `
    allCourses(page: Int!): [Course]!
    courseById(id: Int!): Course!
    courseByName(course: CourseSearch!): [Course]!
`;

const coursesMutations = `
    createCourse(course: CourseInput!): Course!
    deleteCourse(id: Int!): Int
    updateCourse(id: Int!, course: CourseInput!): Course!
`;

const teachersTypeDef = `
type Teacher {
    id: Int!
    name: String!
    description: String!
    teacher_has_courses: [Teacher_has_courses]
    teacher_has_resources: [Teacher_has_resources]
}

type Teacher_has_resources{
    id: Int!
    teacher_id: Int!
    teacher_name: String!
    teacher_description: String!
    resource_id: Int!
    resource_name: String!
    resource_description: String!
    resource_link: String!
}
input TeacherInput {
    name: String!
    description: String!
}
input TeacherSearch {
    teacher_name: String!
}`;

const teachersQueries = `
    allTeachers(page: Int!): [Teacher]!
    teacherById(id: Int!): Teacher!
    teacherByName(teacher: TeacherSearch!): [Teacher]!
`;

const teachersMutations = `
    createTeacher(teacher: TeacherInput!): Teacher!
    deleteTeacher(id: Int!): Int
    updateTeacher(id: Int!, teacher: TeacherInput!): Teacher!
`;

const resourcesTypeDef = `
type Resource {
    id: Int!
    name: String!
    description: String!
    link: String
    created_at: String!
    course_has_resources: [Courses_has_resources]   
    teacher_has_resources: [Teacher_has_resources]
}
input ResourceInput {
    name: String!
    description: String!
}
input ResourceSearch {
    resource_name: String!
}`;

const resourcesQueries = `
    allResources(page: Int!): [Resource]!
    resourceById(id: Int!): Resource!
    resourceByName(resource: ResourceSearch!): [Resource]!
`;


const resourcesMutations = `
    uploadFile(file: Upload!): Boolean
    createResource(resource: ResourceInput!): Resource!
    deleteResource(id: Int!): Int
    updateResource(id: Int!, resource: ResourceInput!): Resource!
`;

const commentsTypeDef = `
type Comment {
    id: Int!
    service_id: Int!
    service: String!
    comment: String!
    user_id: String!
    created_at: String!
}

input CommentInput {
    service_id: Int!
    service: String!
    comment: String!
    user_id: String!
}
input commentSearch{
    service: String!
    service_id: Int!
}`;

const commentsQueries = `
    allComments: [Comment]!
    commentById(id: Int!): Comment!
    commentByService(comment: commentSearch!): [Comment]!
`;

const commentsMutations = `
    createComment(comment: CommentInput!): Comment!
    deleteComment(id: Int!): Int
    updateComment(id: Int!, comment: CommentInput!): Comment!
`;

const scoreresourcesTypeDef = `
type Scoreresource {
    _id: String!
    service_id: Int!
    service: String!
    score: Int!
    user_id: String!
}
type Score{
    excelente: Int!
    bueno: Int!
    medio: Int!
    regular: Int!
    malo: Int!
}
input ScoreresourceInput {
    service_id: Int!
    service: String!
    score: Int!
    user_id: String!
}
input scoreresourceSearch{
    service: String!
    service_id: Int!
}`;

const scoreresourcesQueries = `
    allScoreResources: [Scoreresource]!
    scoreresourceById(_id: String!): Scoreresource!
    scoreresourceByService(scoreresource: scoreresourceSearch!): Score!
`;

const scoreresourcesMutations = `
    createScoreResource(scoreresource: ScoreresourceInput!): Scoreresource!
    deleteScoreResource(_id: String!): Int
    updateScoreResource(_id: String!, scoreresource: ScoreresourceInput!): Scoreresource!
`;

const contactsTypeDef = `
type Contact {
    id: Int!
    name: String!
    lastName: String!
    message: String!
    email: String!
}

input ContactInput {
    name: String!
    lastName: String!
    message: String!
    email: String!
}
`;

const contactsQueries = `
    allContacts: [Contact]!
    contactById(id: Int!): Contact!
`;

const contactsMutations = `
    createContact(contact: ContactInput!): Int
    deleteContact(id: Int!): Int
    updateContact(id: Int!, contact: ContactInput!): Int
`;

const usersTypeDef = `
type User {
    id: String!
    name: String!
    email: String!
    avatar: String!
    password: String!
}

type Userinfo {
    id: String!
    name: String!
    email: String!
    avatar: String!
}

type Token{
    token: String!
}

input UserInput {
    name: String!
    email: String!
    avatar: String!
    password: String!
}

input DataInput {
    email: String!
    password: String!
}
input TokenData{
    token: String!
}
`;

const usersQueries = `
    allUsers: [User]!
    userById(id: String!): User!
    userToken(user: DataInput): Token!
    userInfo(token: TokenData): Userinfo!
`;

const usersMutations = `
    createUser(user: UserInput!): User!
    deleteUser(id: String!): Int
    updateUser(id: String!, user: UserInput!): User!
`;

const url = process.env.COURSES_URL;
const port = process.env.COURSES_PORT;
const entryPoint = process.env.COURSES_ENTRY;

const URL = `http://${url}:${port}/${entryPoint}`;

const resolvers = {
	Query: {
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

const url$1 = process.env.TEACHERS_URL;
const port$1 = process.env.TEACHERS_PORT;
const entryPoint$1 = process.env.TEACHERS_ENTRY;

const URL$1 = `http://${url$1}:${port$1}/${entryPoint$1}`;

const resolvers$1 = {
	Query: {
		allTeachers: (_,{ page }) =>
			getRequest(`${URL$1}?page=${page}`, ''),
		teacherById: (_, { id }) =>
			generalRequest(`${URL$1}/${id}`, 'GET'),
		teacherByName: (_,{teacher})=>
			generalRequest(`http://${url$1}:${port$1}/search`,'POST',teacher),
	},
	Mutation: {
		createTeacher: (_, { teacher }) =>
			generalRequest(`${URL$1}`, 'POST', teacher),
		updateTeacher: (_, { id, teacher }) =>
			generalRequest(`${URL$1}/${id}`, 'PUT', teacher),
		deleteTeacher: (_, { id }) =>
			generalRequest(`${URL$1}/${id}`, 'DELETE')
	}
};

const url$2 = process.env.RESOURCES_URL;
const port$2 = process.env.RESOURCES_PORT;
const entryPoint$2 = process.env.RESOURCES_ENTRY;

const { createWriteStream } = require("fs");
const URL$2 = `http://${url$2}:${port$2}/${entryPoint$2}`;

const storeUpload = ({ stream, filename }) =>
  new Promise((resolve, reject) =>
    stream
      .pipe(createWriteStream(filename))
      .on("finish", () => resolve())
      .on("error", reject)
  );

const resolvers$2 = {
	Query: {
		allResources: (_,{ page }) =>
			getRequest(`${URL$2}?page=${page}`, ''),
		resourceById: (_, { id }) =>
			generalRequest(`${URL$2}/${id}`, 'GET'),
		resourceByName: (_,{resource})=>
			generalRequest(`http://${url$2}:${port$2}/search`,'POST',resource)
	},
	Mutation: {
		uploadFile: async (parent, { file }) => {
      		const { stream, filename } = await file;
      	//await generalRequest2(`${URL}`, 'POST', file)
      	await storeUpload({ stream, filename });
      	console.log(file);
      	return true;
    	},
		createResource: (_, { resource }) =>
			generalRequest(`${URL$2}`, 'POST', resource),
		updateResource: (_, { id, resource }) =>
			generalRequest(`${URL$2}/${id}`, 'PUT', resource),
		deleteResource: (_, { id }) =>
			generalRequest(`${URL$2}/${id}`, 'DELETE')
	}
};

const url$3 = process.env.COMMENTS_URL;
const port$3 = process.env.COMMENTS_PORT;
const entryPoint$3 = process.env.COMMENTS_ENTRY;

const URL$3 = `http://${url$3}:${port$3}/${entryPoint$3}`;

const resolvers$3 = {
	Query: {
		allComments: (_) =>
			getRequest(`${URL$3}/`, 'GET'),
		commentById: (_, { id }) =>
			generalRequest(`${URL$3}/${id}/`, 'GET'),
		commentByService: (_,{comment})=>
			generalRequest(`http://${url$3}:${port$3}/search/`,'POST',comment),
	},
	Mutation: {
		createComment: (_, { comment }) =>
			generalRequest(`${URL$3}/`, 'POST', comment),
		updateComment: (_, { id, comment }) =>
			generalRequest(`${URL$3}/${id}/`, 'PUT', comment),
		deleteComment: (_, { id }) =>
			generalRequest(`${URL$3}/${id}/`, 'DELETE'),
	}
};

const url$4 = process.env.SCORERESOURCES_URL;
const port$4 = process.env.SCORERESOURCES_PORT;
const entryPoint$4 = process.env.SCORERESOURCES_ENTRY;

const URL$4 = `http://${url$4}:${port$4}/${entryPoint$4}`;

const resolvers$4 = {
	Query: {
		allScoreResources: (_) =>
			getRequest(`${URL$4}/`, 'GET'),
		scoreresourceById: (_, { _id }) =>
			generalRequest(`${URL$4}/${_id}/`, 'GET'),
		scoreresourceByService: (_,{scoreresource})=>
			generalRequest(`http://${url$4}:${port$4}/search/`,'POST',scoreresource),
	},
	Mutation: {
		createScoreResource: (_, { scoreresource }) =>
			generalRequest(`${URL$4}/`, 'POST', scoreresource),
		deleteScoreResource: (_, { _id, scoreresource }) =>
			generalRequest(`${URL$4}/${_id}/`, 'PUT', scoreresource),
		updateScoreResource: (_, { _id }) =>
			generalRequest(`${URL$4}/${_id}/`, 'DELETE'),
	}
};

const url$5 = process.env.CONTACTS_URL;
const port$5 = process.env.CONTACTS_PORT;
const entryPoint$5 = process.env.CONTACTS_ENTRY;

const URL$5 = `http://${url$5}:${port$5}/${entryPoint$5}`;

const resolvers$5 = {
	Query: {
		allContacts: (_) =>
			getRequest(`${URL$5}`, ''),
		contactById: (_, { id }) =>
			generalRequest(`${URL$5}/${id}`, 'GET'),
	},
	Mutation: {
		createContact: (_, { contact }) =>
			generalRequest(`${URL$5}`, 'POST', contact),
		updateContact: (_, { id, contact }) =>
			generalRequest(`${URL$5}/${id}`, 'PUT', contact),
		deleteContact: (_, { id }) =>
			generalRequest(`${URL$5}/${id}`, 'DELETE')
	}
};

const url$6 = process.env.USERS_URL;
const port$6 = process.env.USERS_PORT;
const entryPoint$6 = process.env.USERS_ENTRY;

const URL$6 = `http://${url$6}:${port$6}/${entryPoint$6}`;

const resolvers$6 = {
	Query: {
		allUsers: (_) =>
			getRequest(`${URL$6}`, 'GET'),
		userById: (_, { id }) =>
			generalRequest(`${URL$6}/${id}`, 'GET'),
		userToken: (_, { user }) =>
			generalRequest(`http://${url$6}:${port$6}/get-token`, 'POST', user),
		userInfo: (_,{ token }) =>
		    generalRequest1(`http://${url$6}:${port$6}/user`, 'GET',_,token.token)
	},
	Mutation: {
		createUser: (_, { user }) =>
			generalRequest(`${URL$6}`, 'POST', user),
		updateUser: (_, { id, user }) =>
			generalRequest(`${URL$6}/${id}`, 'PUT', user),
		deleteUser: (_, { id }) =>
			generalRequest(`${URL$6}/${id}`, 'DELETE'),
	}
};

// merge the typeDefs
const mergedTypeDefs = mergeSchemas(
	[
		'scalar JSON',
		'scalar Upload',
		coursesTypeDef,
		teachersTypeDef,
		resourcesTypeDef,
		commentsTypeDef,
		scoreresourcesTypeDef,
		contactsTypeDef,
		usersTypeDef,
	],
	[
		coursesQueries,
		teachersQueries,
		resourcesQueries,
		commentsQueries,
		scoreresourcesQueries,
		contactsQueries,
		usersQueries,
	],
	[
		coursesMutations,
		teachersMutations,
		resourcesMutations,
		commentsMutations,
		scoreresourcesMutations,
		contactsMutations,
		usersMutations,
	]
	
);

// Generate the schema object from your types definition.
var graphQLSchema = graphqlTools.makeExecutableSchema({
	typeDefs: mergedTypeDefs,
	resolvers: merge(
		{ JSON: GraphQLJSON }, // allows scalar JSON
		{ Upload: apolloServer.GraphQLUpload} ,
		resolvers,
		resolvers$1,
		resolvers$2,
		resolvers$3,
		resolvers$4,
		resolvers$5,
		resolvers$6,
	)

});

const options = {
  port: 5500,
  endpoint: '/graphql',
  subscriptions: '/graphql',
  playground: '/graphiql',
  cors: {
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}
};

const server = new graphqlYoga.GraphQLServer({ schema:  graphQLSchema });
server.start(options, ({ port }) =>{
  console.log(`Server started, listening on port ${port} for incoming requests.`,);},);
