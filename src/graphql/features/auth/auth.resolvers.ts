import { GraphQLContext } from "../../types/graphql-context.type";
import { GraphQLError } from 'graphql';

export const authResolvers = {
    Mutation: {
        login: async (_: any, args: { input: { email: string; password: string } }, ctx: GraphQLContext) => {
            const { email, password } = args.input;
            const { token, isAuthenticated } = await ctx.services.auth.login(email, password);

            console.dir({ isAuthenticated, token, email, password});

            if (isAuthenticated && !!token) {
                return { accessToken: token};
            }

            return new GraphQLError('Invalid credentials', {
                extensions: {
                    code: 'Unauthorized',
                    http: { status: 401 },
                },
            });
        },
    },  
};