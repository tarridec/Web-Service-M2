export const productsTypeDefs = `
    scalar DateTime    

    type Product {
        id: String!
        title: String!
        category: String!
        ean: String!
        description: String
        specs: String!
        price: Float!
        createdAt: DateTime
        updatedAt: DateTime
    }

    type CreateProductInput {
        title: String!
        category: String!
        ean: String!
        description: String
        specs: String!
        price: Float!
    }

    type UpdateProductInput {
        title: String
        category: String
        ean: String
        description: String
        specs: String
        price: Float
    }
    
    extend type Query {
        products: [Product!]!
    }
        
`;
        // product(id: ID!): Product
        
        // extend type Mutation {
        //     createProduct(input: CreateProductInput): Product!
        //     updateProduct(id: ID!, input: UpdateProductInput): Product!
        //     deleteProduct(id: ID!): Boolean!
        //     }