import { Request } from 'express';
import * as ProductsService from '../services/products.service';
import { ProductsServiceAPI } from '../interfaces/products-service-api.interface';

export const buildContext = (req: Request)=> {
    return {
        req,
        services: {
            products: ProductsService satisfies ProductsServiceAPI
        }   
    };
}