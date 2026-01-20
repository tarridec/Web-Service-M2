import { ApolloServer } from "@apollo/server";
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";
import { GraphQLContext } from "./types/graphql-context.type";
import { json, type Express } from "express";
import { buildContext } from "./context";
import { expressMiddleware } from "@as-integrations/express5";

export const setupGraphQL = async (app: Express) => {
    const apollo = new ApolloServer<GraphQLContext>({
        typeDefs,
        resolvers,
    });

    await apollo.start();

    app.use('/graphql',
        json(),
        expressMiddleware<GraphQLContext>(apollo, {
            context: async ({ req }) => buildContext(req),
        }));
};