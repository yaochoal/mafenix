export const resourcesTypeDef = `
type Resource {
    id: Int!
    name: String!
    description: String!
    link: String!
}

input ResourceInput {
    name: String!
    description: String!
}`;

export const resourcesQueries = `
    allResources(page: Int!): [Resource]!
    resourceById(id: Int!): Resource!
`;

export const resourcesMutations = `
    createResource(resource: ResourceInput!): Resource!
    deleteResource(id: Int!): Int
    updateResource(id: Int!, resource: ResourceInput!): Resource!
`;
