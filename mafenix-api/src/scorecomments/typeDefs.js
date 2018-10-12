export const scorecommentsTypeDef = `
type Scorecomment {
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
input ScorecommentInput {
    service_id: Int!
    service: String!
    score: Int!
    user_id: String!
}
input scorecommentSearch{
    service: String!
    service_id: Int!
}`;

export const scorecommentsQueries = `
    allScoreComments: [Scorecomment]!
    scorecommentById(_id: String!): Scorecomment!
    scorecommentByService(scorecomment: scorecommentSearch!): Score!
`;

export const scorecommentsMutations = `
    createScoreComment(scorecomment: ScorecommentInput!): Scorecomment!
    deleteScoreComment(_id: String!): Int
    updateScoreComment(_id: String!, scorecomment: ScorecommentInput!): Scorecomment!
`;
