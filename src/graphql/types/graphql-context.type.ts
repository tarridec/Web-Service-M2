import { Request } from 'express';
import { ProductsServiceAPI } from '../../interfaces/products-service-api.interface';
import { AuthServiceAPI } from '../../interfaces/auth-service-api.interface';
import { User } from '../../types/user';

export type GraphQLContext = {
    req: Request,
    user?: User;
    services: {
        products: ProductsServiceAPI;
        auth: AuthServiceAPI;
    }
};