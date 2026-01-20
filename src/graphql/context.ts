import { Request } from 'express';
import * as ProductsService from '../services/products.service';
import * as AuthService from '../services/auth.service';
import { ProductsServiceAPI } from '../interfaces/products-service-api.interface';
import { AuthServiceAPI } from '../interfaces/auth-service-api.interface';
import { User } from '../types/user';
import { Role } from '../types/role';
import { getUsersByEmail } from '../services/users.service';
import { verify } from '../utils/jwt.utils';

const parseBearerToken = (req: Request): string | null => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) return null;

    const [type, token] = authHeader.split(' ');

    if (type.toLowerCase() !== 'bearer' || !token) return null;

    return token;
}

export const buildContext = async (req: Request) => {
    let user: User | undefined = undefined;

    const token: string | null = parseBearerToken(req);

    if (token) {
        const { email } = verify(token);
        user = await getUsersByEmail(email);
    }

    return {
        req,
        user,
        services: {
            auth: AuthService satisfies AuthServiceAPI,
            products: ProductsService satisfies ProductsServiceAPI
        }   
    };
}