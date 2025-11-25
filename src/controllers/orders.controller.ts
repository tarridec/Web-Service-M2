import { Request, Response } from "express";
import { Order } from "../types/order.type";
import { postOrder } from "../services/orders.service";

export const create = async (req: Request, res: Response) => {
    const { items } = req.body ?? {};
    const user = (req as any).user;

    if (!items) {
        return res.status(400).json({ message: "Paramètres incorrects" });
    }

    const body: Omit<Order, 'id'> = {
        userId: user.id,
        items,
    };

    const {success, newOrder} = await postOrder(body);

    if (success) {
        res.status(201).json(newOrder);
    } else {
        res.status(500).json({ message: `Erreur lors de la création de la commande` });
    }
};

export const getMyOrders = async (_req: Request, res: Response) => {
    try {
        const order: Order[] = [];
        res.status(200).json({order});
    } catch (error) {
        res.status(400).json({message: "Erreur dans les données"});
    }
};

export const getById = async (_req: Request, res: Response) => {
    try {
        // TODO : implémenter la méthode de récupération de la commande
        const order: Order | undefined = undefined;
        if(order) {
            res.status(200).json({order});
        } else {
            res.status(404).json({message: "Commande non trouvée"});
        }
    } catch (error) {
        res.status(400).json({message: "Erreur dans les données"});
    }
};