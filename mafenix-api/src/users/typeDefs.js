export const usersTypeDef = `
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

export const usersQueries = `
    allUsers: [User]!
    userById(id: String!): User!
    userToken(user: DataInput): Token!
    userInfo(token: TokenData): Userinfo!
`;

export const usersMutations = `
    createUser(user: UserInput!): User!
    deleteUser(id: String!): Int
    updateUser(id: String!, user: UserInput!): User!
`;
