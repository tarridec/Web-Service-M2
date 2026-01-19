import path from 'path';
import { Product } from '../types';
import { FILE_JSON_PRODUCTS } from '../utils/constants';
import { parseJsonFile, writeJsonFile } from '../utils/utils';
import { get } from 'http';
import { ProductModel } from '../models/product-schema.model';

/*
* MONGO DB METHODS
*/
export const getListAllProduct = async (queryParams: { page?: number; limit?: number; s?: string }) => {
  const filter: Record<string, unknown> = {};
  const search = (queryParams.s || '').trim();
  
  if (search && search.length > 0) {
    const regex = new RegExp(search, 'i');
    filter.$or = [
      { title: { regex } },
      { description: { regex } },
      { category: { regex } },
    ];
 }
      
  const page = queryParams.page ?? 1;
  const limit = queryParams.limit ?? 10;
  const skip = (page - 1) * limit;

  const products = await ProductModel.find(filter).skip(skip).limit(limit).sort({ _id: 1 }).exec();
  return products;
};

export const getProductByIdMongo = async (id: string) => {
  const product = await ProductModel.findById(id).exec();
  return product;
};

export const seedProducts = async () => {
  const products: Product[] = await getProductsJson();

  await ProductModel.deleteMany();
  await ProductModel.insertMany(products);
};

export const createProduct = async (body: Omit<Product, 'id'>) => {
  const newProduct = createNewIdProduct(body);

  const result = await ProductModel.create(newProduct);
  if (result) {
    return { success: true, newProduct: result };
  }
  return { success: false };
};

export const updateProduct = async (id: string, payload: Product) => {
  const updatedProduct = await ProductModel.findOneAndReplace(
    { _id: id},
    { ...payload },
    { new: true }
  );
  if (updatedProduct) {
    return { success: true, updatedProduct };
  }
  return { success: false };
};

export const updateProd = async (id: string, payload: Product) => {
  const updatedProduct = await ProductModel.findByIdAndUpdate(
    id,
    { ...payload },
    { new: true }
  );
  if (updatedProduct) {
    return { success: true, updatedProduct };
  }
  return { success: false };
};

export const deleteProduct = async (id: string) => {
  const result = await ProductModel.findByIdAndDelete(id);
  if (result) {
    return { success: true };
  }
  return { success: false };
  
}


/*
* JSON FILE METHODS
*/
export const getProductsJson = async () => {
  return await parseJsonFile<Product[]>(path.resolve(FILE_JSON_PRODUCTS));
};

export const newProductsJson = async (data: Product[]) => {
  return await writeJsonFile(path.resolve(FILE_JSON_PRODUCTS), data);
};

export const createNewIdProduct = (product: Omit<Product, 'id'>): Product => {
  return {
    id: Date.now(),
    ...product,
  };
};

export const getProductFromId = async (id: number) => {
  return (await getProductsJson()).filter((product) => product.id === id)[0];
};

export const getListProduct = async (limit: number, page: number, s: any) => {
  let data = await getProductsJson();
  if (s) {
    //recherche
    data = researchProduct(s, data);
  }
  if (limit && page) {
    //pagination
    data = data.slice((page - 1) * limit, page * limit);
  }
  
  return data ?? [];
};

export const listProduct = async () => {
  let data = await getProductsJson();
  
  return data ?? [];
};

const researchProduct = (research: string, data: Product[]): Product[] => {
  const valueLower = research.toLowerCase();
  
  return data.filter(
    (product) =>
      product.title?.toLowerCase().includes(valueLower) ||
    (product.description && product.description?.toLowerCase().includes(valueLower)) ||
    product.category?.toLowerCase().includes(valueLower),
  );
};

export const postProduct = async (body: Omit<Product, 'id'>) => {
  const data = await getProductsJson();

  const newProduct = createNewIdProduct(body);

  data.push(newProduct);

  const resultSaveProduct = await newProductsJson(data);
  if (resultSaveProduct) {
    return { success: true, newProduct };
  }
  return { success: false };
};

export const putProduct = async (payload: Product) => {
  const newProduct: Product = {
    ...payload,
  };

  const resultProduct = await saveProduct(newProduct);
  if (resultProduct) {
    return { success: true, newProduct };
  }
  return { success: false };
};

export const patchProduct = async (payload: Product, oldProduct: Product) => {
  const newProduct: Product = {
    ...oldProduct,
    ...payload,
  };

  const resultProduct = await saveProduct(newProduct);
  if (resultProduct) {
    return { success: true, newProduct };
  }
  return { success: false };
};

export const saveProduct = async (product: Product) => {
  const data = await getProductsJson();

  //Modification dans data
  const objWithIdIndex = data.findIndex((p) => p.id === product.id);
  if (objWithIdIndex > -1) {
    data[objWithIdIndex] = product;
    await newProductsJson(data);
    return true;
  }
  return false;
};

export const removeProduct = async (id: number) => {
  const data = await getProductsJson();

  const objWithIdIndex = data.findIndex((p) => p.id === id);

  if (objWithIdIndex > -1) {
    //suppression dans le tableau
    data.splice(objWithIdIndex, 1);
    await newProductsJson(data);
    return true;
  }
  return false;
};
