import path from "path/win32";
import { Order } from "../types/order.type";
import { FILE_JSON } from "../utils/constants";
import { parseJsonFile, writeJsonFile } from "../utils/utils";

// Récupère toutes les commandes à partir du fichier JSON
export const getOrdersJson = async () => {
  return await parseJsonFile<Order[]>(path.resolve(FILE_JSON));
};

// Écrit les commandes dans le fichier JSON
export const newOrdersJson = async (data: Order[]) => {
  return await writeJsonFile(path.resolve(FILE_JSON), data);
};

// Crée une nouvelle commande
export const createNewOrder = (order: Omit<Order, 'id'>): Order[] => {
    return {
        id: Date.now(),
        ...order,
    };
};

// Ajoute une nouvelle commande
export const postOrder = async (body: Omit<Order, 'id'>) => {
    const data = await getOrdersJson();

    const newOrder = createNewOrder(body);

    data.push(newOrder);

    const resultSaveOrder = await newOrdersJson(data);
    if (resultSaveOrder) {
        return { success: true, newOrder };
    }
        return { success: false };
}

// Récupère une commande par son ID
export const getOrderFromId = async (id: number) => {
  return (await getOrdersJson()).filter((order) => order.id === id)[0];
};

export const researchOrder = (research: string, data: Order[]): Order[] => {
  const valueLower = research.toLowerCase();

  return data.filter(
    (order) =>
      product.title?.toLowerCase().includes(valueLower) ||
      (product.description && product.description?.toLowerCase().includes(valueLower)) ||
      product.category?.toLowerCase().includes(valueLower),
  );
};