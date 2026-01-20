import { Request } from 'express';
import { ProductsServiceAPI } from '../../interfaces/products-service-api.interface';
import { AuthServiceAPI } from '../../interfaces/auth-service-api.interface';

export type GraphQLContext = {
    req: Request,
    services: {
        products: ProductsServiceAPI;
        auth: AuthServiceAPI;
    }
};