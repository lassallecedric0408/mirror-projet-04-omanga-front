import { Category } from './Category';
import { Universe } from './Universe';

export type Product = {
  id?: number;
  // category: Category;
  // universe: Universe;
  stock?: string;
  product_name?: string;
  product_description?: string;
  // price: number;
  product_image_name?: String;

  name: string;
  price: number;
  imgPath: string;
  category: string;
  universe: string;
  product_creation_date: number;
  description: string;
};
