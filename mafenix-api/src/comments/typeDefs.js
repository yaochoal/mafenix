export const commentsTypeDef = `
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

export const commentsQueries = `
    allComments: [Comment]!
    commentById(id: Int!): Comment!
    commentByService(comment: commentSearch!): [Comment]!
`;

export const commentsMutations = `
    createComment(comment: CommentInput!): Comment!
    deleteComment(id: Int!): Int
    updateComment(id: Int!, comment: CommentInput!): Comment!
`;
