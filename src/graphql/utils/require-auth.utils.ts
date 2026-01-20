import { GraphQLContext } from "../types/graphql-context.type";
import { GraphQLError } from "graphql";

export const requireAuth = (ctx: GraphQLContext) => {
    if (!ctx.user) {
        throw new GraphQLError("Authentication required", {
            extensions: {
                code: "Unauthorized",
                http: { status: 401 }
            }
        });
    }

    return true;
}