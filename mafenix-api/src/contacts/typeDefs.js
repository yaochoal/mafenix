export const contactsTypeDef = `
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

export const contactsQueries = `
    allContacts: [Contact]!
    contactById(id: Int!): Contact!
`;

export const contactsMutations = `
    createContact(contact: ContactInput!): Int
    deleteContact(id: Int!): Int
    updateContact(id: Int!, contact: ContactInput!): Int
`;
