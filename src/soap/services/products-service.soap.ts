import { IServices } from "soap";
import { getListProduct, getProductFromId, listProduct, postProduct, removeProduct } from "../../services/products.service";
import { SoapCallbackFunction } from "../types/soap-callback-function.type";
import { get } from "http";

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
                const product = await getProductFromId(Number(id));

                !!callback && callback({ product });
            },

            DeleteProduct: async function({ id }: {id: number}, callback: SoapCallbackFunction) {
                const product = await removeProduct(Number(id));

                !!callback && callback({ product });
            },

            AddProduct: async function(body, callback: SoapCallbackFunction) {
                const product = await postProduct(body);

                !!callback && callback({ product });
            },
        },
    }
};

// export const productsService: IServices = {
//     ProductsService: {
//         ProductsServicePort: {
//             ListProducts: async function(_: unknown, callback: SoapCallbackFunction) {
//                 const products = await listProduct();

//                 !!callback && callback({ products });
//             },

//             GetProduct: async function({ id }: {id: number}, callback: SoapCallbackFunction) {
//               const product = await getProductFromId(Number(id));
//
//                !!callback && callback({ product });
//            },
//         },
//     },
// };