type Review = {
  id: string
  created_at: string;
  content: string;
  published: false;
  rating: number;
  user_id: number;
  product_id: number;
}
type Order = {
  id: number;
  order_date: string;
  archeving_date: string;
  product_quantity: number;
  product_id: number;
  user_id: number;
}

export type Product = {
  id: number;
  stock: number;
  name: string;
  description: string
  price: number;
  image_url: string;
  category_id: number;
  universe_id: number;
  category: {
    name: string;
  },
  universe: {
    name: string;
  }
  reviews: Review[];
  orders: Order[];
}

