import { GraphQLContext } from '../../types/graphql-context.type';

export const productsResolvers = {
    Query: {
        products: (_: any, args: any, ctx: GraphQLContext) => ctx.services.products.getListAllProduct({}),
        //product: (_: any, args: any, ctx: GraphQLContext) => ctx.services.products.getProductByIdMongo(args.id)
    },

    // Mutation: {
    //     // createProduct,
    //     // updateProduct,
    //     // deleteProduct
    // }
};