import merge from 'lodash.merge';
import GraphQLJSON from 'graphql-type-json';
import { makeExecutableSchema } from 'graphql-tools';

import { mergeSchemas } from './utilities';

import {
	coursesMutations,
	coursesQueries,
	coursesTypeDef
} from './courses/typeDefs';

import {
	teachersMutations,
	teachersQueries,
	teachersTypeDef

} from './teachers/typeDefs';

import {
	resourcesMutations,
	resourcesQueries,
	resourcesTypeDef
} from './resources/typeDefs';
import {
	commentsMutations,
	commentsQueries,
	commentsTypeDef

} from './comments/typeDefs';


import {
	commentsMutations,
	commentsQueries,
	commentsTypeDef
} from './comments/typeDefs';

import {
	scorecommentsMutations,
	scorecommentsQueries,
	scorecommentsTypeDef
} from './scorecomments/typeDefs';

import {
	contactsMutations,
	contactsQueries,
	contactsTypeDef
} from './contacts/typeDefs';

import {
	usersMutations,
	usersQueries,
	usersTypeDef
} from './users/typeDefs';


import coursesResolvers from './courses/resolvers';
import teachersResolvers from './teachers/resolvers';
import resourcesResolvers from './resources/resolvers';
import commentsResolvers from './comments/resolvers';
<<<<<<< HEAD:api-gateway/src/graphQLSchema.js
=======
import scorecommentsResolvers from './scorecomments/resolvers';
import contactsResolvers from './contacts/resolvers';
import usersResolvers from './users/resolvers';
>>>>>>> develop:mafenix-api/src/graphQLSchema.js

// merge the typeDefs
const mergedTypeDefs = mergeSchemas(
	[
		'scalar JSON',
		coursesTypeDef,
		teachersTypeDef,
		resourcesTypeDef,
<<<<<<< HEAD:api-gateway/src/graphQLSchema.js
		commentsTypeDef
=======
		commentsTypeDef,
		scorecommentsTypeDef,
		contactsTypeDef,
		usersTypeDef,
>>>>>>> develop:mafenix-api/src/graphQLSchema.js
	],
	[
		coursesQueries,
		teachersQueries,
		resourcesQueries,
<<<<<<< HEAD:api-gateway/src/graphQLSchema.js
		commentsQueries
=======
		commentsQueries,
		scorecommentsQueries,
		contactsQueries,
		usersQueries,
>>>>>>> develop:mafenix-api/src/graphQLSchema.js
	],
	[
		coursesMutations,
		teachersMutations,
		resourcesMutations,
<<<<<<< HEAD:api-gateway/src/graphQLSchema.js
		commentsMutations
=======
		commentsMutations,
		scorecommentsMutations,
		contactsMutations,
		usersMutations,
>>>>>>> develop:mafenix-api/src/graphQLSchema.js
	]
	
);

// Generate the schema object from your types definition.
export default makeExecutableSchema({
	typeDefs: mergedTypeDefs,
	resolvers: merge(
		{ JSON: GraphQLJSON }, // allows scalar JSON
		coursesResolvers,
		teachersResolvers,
		resourcesResolvers,
<<<<<<< HEAD:api-gateway/src/graphQLSchema.js
		commentsResolvers
=======
		commentsResolvers,
		scorecommentsResolvers,
		contactsResolvers,
		usersResolvers,
>>>>>>> develop:mafenix-api/src/graphQLSchema.js
	)
});
