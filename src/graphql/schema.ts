import { productsTypeDefs } from "./features/products/products.typeDefs";
import { authTypeDefs } from "./features/auth/auth.typeDefs";

const baseTypeDefs = `
    type Query
    type Mutation
`;

export const typeDefs = [baseTypeDefs, productsTypeDefs, authTypeDefs];