import merge from 'lodash.merge';
import GraphQLJSON from 'graphql-type-json';
import { makeExecutableSchema} from 'graphql-tools';
import { mergeSchemas } from './utilities';
import { GraphQLUpload} from 'apollo-server'

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
	scoreresourcesMutations,
	scoreresourcesQueries,
	scoreresourcesTypeDef
} from './scoreresources/typeDefs';

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
import scoreresourcesResolvers from './scoreresources/resolvers';
import contactsResolvers from './contacts/resolvers';
import usersResolvers from './users/resolvers';

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
export default makeExecutableSchema({
	typeDefs: mergedTypeDefs,
	resolvers: merge(
		{ JSON: GraphQLJSON }, // allows scalar JSON
		{ Upload: GraphQLUpload} ,
		coursesResolvers,
		teachersResolvers,
		resourcesResolvers,
		commentsResolvers,
		scoreresourcesResolvers,
		contactsResolvers,
		usersResolvers,
	)

});
