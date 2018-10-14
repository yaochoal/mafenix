export const scoreresourcesTypeDef = `
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

export const scoreresourcesQueries = `
    allScoreResources: [Scoreresource]!
    scoreresourceById(_id: String!): Scoreresource!
    scoreresourceByService(scoreresource: scoreresourceSearch!): Score!
`;

export const scoreresourcesMutations = `
    createScoreResource(scoreresource: ScoreresourceInput!): Scoreresource!
    deleteScoreResource(_id: String!): Int
    updateScoreResource(_id: String!, scoreresource: ScoreresourceInput!): Scoreresource!
`;
