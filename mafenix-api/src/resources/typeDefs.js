export const resourcesTypeDef = `
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
    link: String!
}
input ResourceSearch {
    resource_name: String!
}`;

export const resourcesQueries = `
    allResources(page: Int!): [Resource]!
    allResources1: [Resource]!
    resourceById(id: Int!): Resource!
    resourceByName(resource: ResourceSearch!): [Resource]!
`;


export const resourcesMutations = `
    createResource(resource: ResourceInput!): Resource!
    deleteResource(id: Int!): Int
    updateResource(id: Int!, resource: ResourceInput!): Resource!
`;
