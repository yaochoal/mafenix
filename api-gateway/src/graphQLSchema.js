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

import coursesResolvers from './courses/resolvers';
import teachersResolvers from './teachers/resolvers';
import resourcesResolvers from './resources/resolvers';

// merge the typeDefs
const mergedTypeDefs = mergeSchemas(
	[
		'scalar JSON',
		coursesTypeDef,
		teachersTypeDef,
		resourcesTypeDef
	],
	[
		coursesQueries,
		teachersQueries,
		resourcesQueries
	],
	[
		coursesMutations,
		teachersMutations,
		resourcesMutations
	]
	
);

// Generate the schema object from your types definition.
export default makeExecutableSchema({
	typeDefs: mergedTypeDefs,
	resolvers: merge(
		{ JSON: GraphQLJSON }, // allows scalar JSON
		coursesResolvers,
		teachersResolvers,
		resourcesResolvers
	)
});
