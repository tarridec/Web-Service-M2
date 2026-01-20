import { Role } from "../../types/role";
import { GraphQLContext } from "../types/graphql-context.type";
import { GraphQLError } from "graphql";

export const requireRole = (ctx: GraphQLContext, requiredRole: Role) => {
    if (!ctx.user || ctx.user?.role !== requiredRole) {
        throw new GraphQLError("Insufficient permissions", {
            extensions: {
                code: "Forbidden",
                http: { status: 403 }
            }
        });
    }

    return true;
}