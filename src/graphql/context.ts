import { Request } from 'express';
import * as ProductsService from '../services/products.service';
import * as AuthService from '../services/auth.service';
import { ProductsServiceAPI } from '../interfaces/products-service-api.interface';
import { AuthServiceAPI } from '../interfaces/auth-service-api.interface';

export const buildContext = (req: Request)=> {
    return {
        req,
        services: {
            products: ProductsService satisfies ProductsServiceAPI,
            auth: AuthService satisfies AuthServiceAPI
        }   
    };
}