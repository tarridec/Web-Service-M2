import { IServices } from "soap";
import { getListProduct, getProductFromId, postProduct, putProduct, removeProduct } from "../../services/products.service";
import { SoapCallbackFunction } from "../types/soap-callback-function.type";
import { Product } from "../../types";

export const productsService: IServices = {
    ProductsService: {
        ProductsServicePort: {
            ListProducts: async function(args: any, callback: SoapCallbackFunction) {
                const limit = args?.limit ?? 10;
                const page = args?.page ?? 1;
                const s = args?.search ?? null;

                const products = await getListProduct(limit, page, s);

                !!callback && callback({ products });
            },

            GetProduct: async function({ id }: {id: number}, callback: SoapCallbackFunction) {
                if (!callback) return;

                const product: Product | undefined = await getProductFromId(Number(id));

                if (product) {
                    return callback({ product });
                }

                // Générer une erreur SOAP
                return callback({
                    Fault: {
                        faultcode: "soap:Client",
                        faultstring: `Product with id ${id} not found.`,
                        detail: {
                            code: 404,
                            message: `Product with ID ${id} does not exist.`
                        },
                    },
                });
            },

            DeleteProduct: async function({ id }: {id: number}, callback: SoapCallbackFunction) {
                const product = await removeProduct(Number(id));

                !!callback && callback({ product });
            },

            AddProduct: async function(body, callback: SoapCallbackFunction) {
                const product = await postProduct(body);

                !!callback && callback({ product });
            },

            UpdateProduct: async function(payload: Product, callback: SoapCallbackFunction) {
                const product = await putProduct(payload);

                !!callback && callback({ product });
            },
        },
    }
};