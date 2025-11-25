import { OrderItem } from "./order-item.type";

export type Order = {
    id: number;
    userId: string;
    items : OrderItem[];
};