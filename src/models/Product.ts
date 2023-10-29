import { Booking } from "./Booking";
import { Review } from "./Review";

export type Product = {
  id: number;
  stock: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category_id: number;
  universe_id: number;
  category: {
    name: string;
  };
  universe: {
    name: string;
  };
  reviews: Review[];
  orders: Booking[];
};
