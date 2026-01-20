export const authTypeDefs = `
    type User {
        id: String!
        email: String!
        passwordHash: String!
        role: String!
        createdAt: DateTime
        updatedAt: DateTime
    }

    type AuthPayload {
        accessToken: String!
    }

    input LoginInput {
        email: String!
        password: String!
    }

    extend type Mutation {
        login(input: LoginInput!): AuthPayload!
    }
`;