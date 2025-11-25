import { NextFunction, Request, Response } from "express";
import { verify } from "../utils/jwt.utils";
import { Role } from "../types/role";

// Middleware to authenticate requests using JWT
export function auth(req: Request, res: Response, next: NextFunction) {
    const h = req.header('Authorization');
    if(!h?.startsWith('Bearer '))
        throw res.status(401).json({ message: 'Token manquant ou mal formé' });
    try {
        (req as any).user = verify(h.slice(7));
        next();
    } catch (error) {
        throw res.status(401).json({ message: 'Token invalide ou expiré' });
    }
}

// Middleware to authorize based on user roles
export function authorize(...roles: Role[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = (req as any).user;
        if (!user)
            return res.status(401).json({ error: 'Rôle non autorisé'});

        if (roles.length && !roles.includes(user.role)) 
            return res.status(401).json({ error: 'Rôle insuffisant'});

        next();
    };
}