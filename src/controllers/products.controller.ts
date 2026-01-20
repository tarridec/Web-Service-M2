import { Request, Response } from 'express';
import {
  getListAllProduct,
  getProductByIdMongo,
  getProductFromId,
  patchProduct,
  updateProduct,
  postProduct,
  createProduct,
  putProduct,
  updateProd,
  removeProduct,
  deleteProduct,
  seedProducts,
} from '../services/products.service';
import { Product } from '../types';
import { ProductModel } from '../models/product-schema.model';

export const seed = async (req: Request, res: Response) => {
  await seedProducts();
  res.status(201).json({ message: 'Ok' });
}

export const postMongo = async (req: Request, res: Response) => {
  const { title, category, description, ean, specs, price } = req.body ?? {};

  if (!(title && category && ean && specs && price !== undefined)) {
    return res.status(400).json({ message: `Error type Product` });
  }
  const body: Omit<Product, 'id'> = {
    title,
    category,
    ean,
    description,
    specs,
    price,
  };

  const { success, newProduct } = await createProduct(body);

  if (success) {
    res.status(201).json(newProduct);
  } else {
    res.status(500).json({ message: `Error create Product` });
  }
};

export const putMongo = async (req: Request, res: Response) => {
  const idParams = String(req.params.id);
  const { title, category, ean, specs, price } = req.body ?? {};

  if (!(title && category && ean && specs && price)) {
    return res.status(400).json({ message: `Error type Product` });
  }

  const { success, updatedProduct } = await updateProduct(idParams, req.body);

  if (success) {
    res.status(200).json(updatedProduct);
  } else {
    res.status(500).json({ message: `Error update Product` });
  }
};

export const patchMongo = async (req: Request, res: Response) => {
  const idParams = String(req.params.id);

  const { success, updatedProduct } = await updateProd(idParams, req.body);

  if (success) {
    res.status(200).json(updatedProduct);
  } else {
    res.status(500).json({ message: `Error patch Product` });
  }
};



export const getList = async (req: Request, res: Response): Promise<void> => {
  /*
  * MONGO DB METHOD
  */
  const queryParams = {
    page: req.query.page ? Number(req.query.page) : undefined,
    limit: req.query.limit ? Number(req.query.limit) : undefined,
    s: req.query.s ? String(req.query.s) : undefined,
  };
  const products = await getListAllProduct(queryParams);
  res.status(200).json(products);

  /*
  * JSON FILE METHOD
  */
  // const products = await ProductModel.find().exec();
  // res.json(products);
  
  // //Pour la recherche mettre tt en minuscule
  // const { limit, page, s } = req.query;
  // const data = await getListProduct(Number(limit), Number(page), s);
  // //utilisation du logger
  // //req.log.warn('test');
  // res.status(200).json(data);
};

export const get = async (req: Request, res: Response): Promise<void> => {
  /*
  * MONGO DB METHOD
  */
  const id = String(req.params.id);
  const product = await getProductByIdMongo(id);
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json({ message: `Product id ${id} not found` });
  }

  /*
  * JSON FILE METHOD
  */
  // const id = Number(req.params.id);
  // const data = await getProductsJson();
  // const product = data.filter((product) => product.id === id);
  // if (product.length > 0) {
  //   res.status(200).json(product[0]);
  // } else {
  //   res.status(404).json({ message: `Product id ${id} not found` });
  // }
};

export const post = async (req: Request, res: Response) => {
  const { title, category, description, ean, specs, price } = req.body ?? {};

  if (!(title && category && ean && specs && price !== undefined)) {
    return res.status(400).json({ message: `Error type Product` });
  }
  const body: Omit<Product, 'id'> = {
    title,
    category,
    ean,
    description,
    specs,
    price,
  };

  const { success, newProduct } = await postProduct(body);

  if (success) {
    res.status(201).json(newProduct);
  } else {
    res.status(500).json({ message: `Error create Product` });
  }
};

export const patch = async (req: Request, res: Response) => {
  const idParams = String(req.params.id);
  const { title, category, ean, specs, price } = req.body ?? {};

  if (!(title && category && ean && specs && price)) {
    return res.status(400).json({ message: `Error type Product` });
  }

  const oldProduct = await getProductFromId(idParams);
  if (!oldProduct) {
    return res.status(404).json({ message: `Error Product not exist` });
  }

  const { id, ...payload } = req.body;

  const { success, newProduct } = await patchProduct(payload, oldProduct);

  if (success) {
    res.status(200).json(newProduct);
  } else {
    res.status(500).json({ message: `Error patch Product` });
  }
};

export const put = async (req: Request, res: Response) => {
  const idParams = String(req.params.id);
  const { title, category, ean, specs, price } = req.body ?? {};

  if (!(title && category && ean && specs && price)) {
    return res.status(400).json({ message: `Error type Product` });
  }

  const oldProduct = await getProductFromId(idParams);
  if (!oldProduct) {
    return res.status(404).json({ message: `Error Product not exist` });
  }

  const { id, ...payload } = req.body;

  const { success, newProduct } = await putProduct(payload);

  if (success) {
    res.status(200).json(newProduct);
  } else {
    res.status(500).json({ message: `Error put Product` });
  }
};

export const remove = async (req: Request, res: Response) => {
  /*
  * MONGO DB METHOD
  */
  const idParams = String(req.params.id);

  const { success } = await deleteProduct(idParams);

  if (success) {
    res.status(204).json();
  } else {
    res.status(500).json({ message: `Error remove Product` });
  }
  
  /*
  * JSON FILE METHOD
  */
  // const id = Number(req.params.id);

  // const success = await removeProduct(id);
  // if (success) {
  //   res.status(204).json();
  // } else {
  //   res.status(500).json({ message: `Error put Product` });
  // }
};
