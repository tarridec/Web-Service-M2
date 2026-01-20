import { Product } from "../types";

export interface ProductsServiceAPI {
    getListAllProduct: (queryParams: { page?: number; limit?: number; s?: string }) => Promise<Product[]>;
    getProductByIdMongo: (id: string) => Promise<Product | null | undefined>;
    createProduct: (body: Omit<Product, 'id'>) => Promise<{success: boolean; newProduct?: Product}>;
    updateProduct: (id: string, payload: Product) => Promise<{success: boolean; updatedProduct?: Product}>;
    updateProd: (id: string, payload: Product) => Promise<{success: boolean; updatedProduct?: Product}>;
    deleteProduct: (id: string) => Promise<{success: boolean}>;
}