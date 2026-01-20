import { productsTypeDefs } from "./features/products/products.typeDefs";

const baseTypeDefs = `
    type Query
    
    `;
    
    export const typeDefs = [baseTypeDefs, productsTypeDefs];
    //type Mutation