import { authResolvers } from "./features/auth/auth.resolvers";
import { productsResolvers } from "./features/products/product.resolvers";

export const resolvers = [productsResolvers, authResolvers];