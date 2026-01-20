import { GraphQLContext } from '../../types/graphql-context.type';
import { GraphQLError } from 'graphql';

export const productsResolvers = {
    Query: {
        products: (_: any, args: any, ctx: GraphQLContext) => ctx.services.products.getListAllProduct({}),
        product: (_: any, args: any, ctx: GraphQLContext) => ctx.services.products.getProductByIdMongo(args.id)
    },

    Mutation: {
        createProduct: async (_: any, args: any, ctx: GraphQLContext) => {
            const result = await ctx.services.products.createProduct(args.input);

            if (result.success) {
                return result.newProduct;
            }

            return new GraphQLError('Failed to create product');
        },

        updateProduct: async (_: any, args: any, ctx: GraphQLContext) => {
            const result = await ctx.services.products.updateProduct(args.id, args.input);

            if (result.success) {
                return result.updatedProduct;
            }

            return new GraphQLError('Failed to update product');
        },

        deleteProduct: async (_: any, args: any, ctx: GraphQLContext) => {
            const result = await ctx.services.products.deleteProduct(args.id);

            if (result.success) {
                return true;
            }

            return new GraphQLError('Failed to delete product');
        }
    }
};