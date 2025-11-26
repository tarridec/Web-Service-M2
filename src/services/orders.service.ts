import path from "path/win32";
import { Order } from "../types/order.type";
import { FILE_JSON_ORDERS } from "../utils/constants";
import { parseJsonFile, writeJsonFile } from "../utils/utils";

// Récupère toutes les commandes à partir du fichier JSON
export const getOrdersJson = async () => {
  return await parseJsonFile<Order[]>(path.resolve(FILE_JSON_ORDERS));
};

// Écrit les commandes dans le fichier JSON
export const newOrdersJson = async (data: Order[]) => {
  return await writeJsonFile(path.resolve(FILE_JSON_ORDERS), data);
};

// Crée une nouvelle commande
export const createNewOrder = (order: Omit<Order, 'id'>): Order => {
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
    //console.dir({data, newOrder});

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

// Récupère la liste des commandes pour un utilisateur donné
export const getOrderList = async (id: string) => {
    const data = await getOrdersJson();

    return data.filter(order => order.userId === id) ?? [];
}

// Sauvegarde une commande existante (modification)
export const saveOrder = async (order: Order) => {
  const data = await getOrdersJson();
  const objWithIdIndex = data.findIndex((o) => o.id === order.id);

  if (objWithIdIndex > -1) {
    data[objWithIdIndex] = order;
    await newOrdersJson(data);
    return true;
  }
  return false;
}