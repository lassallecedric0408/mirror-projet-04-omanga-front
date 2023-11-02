import { type Product } from "../models/Product";
import { refreshToken } from "./refreshToken";

const API_URL = process.env.REACT_APP_API_URL;

type GetAllProductsReturn = {
  data: Product[];
};
const getAllProducts = async (): Promise<GetAllProductsReturn> => {
  const response = await fetch(`${API_URL}/products`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
  });
  const data = await response.json();
  return { data };
};

const getOneProduct = async (
  id: number,
): Promise<{
  data: Product;
}> => {
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": `${API_URL}`,
    },
    mode: "cors",
  });
  const data: Product = await response.json();
  return { data };
};

type productRequest = {
  stock: number;
  name: string;
  description: string;
  image_url: string | undefined;
  price: number;
  category_id: number;
  universe_id: number;
};

type productResponse = {
  message: string;
  result: {
    id: number;
    stock: number;
    name: string;
    description: string;
    image_url: string;
    price: string;
    created_at: string;
    updated_at: string;
    category_id: number;
    universe_id: number;
  };
};

const createOneProduct = async (
  productRequest: productRequest,
  email: string | undefined,
): Promise<{
  data: productResponse;
}> => {
  const token = await refreshToken(email);
  const response = await fetch(`${API_URL}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.data}`,
    },
    body: JSON.stringify(productRequest),
    mode: "cors",
  });
  const data: productResponse = await response.json();
  return { data };
};

const updateOneProduct = async (
  id: number | undefined,
  email: string | undefined,
  productRequest: productRequest,
): Promise<{
  data: productResponse;
}> => {
  const token = await refreshToken(email);
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.data}`,
    },
    body: JSON.stringify(productRequest),
    mode: "cors",
  });
  const data: productResponse = await response.json();
  return { data };
};

const deleteOneProduct = async (
  id: number,
  email: string | undefined,
): Promise<{
  data: productResponse;
}> => {
  const token = await refreshToken(email);
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.data}`,
    },
    mode: "cors",
  });
  const data: productResponse = await response.json();
  return { data };
};

export {
  getAllProducts,
  getOneProduct,
  createOneProduct,
  updateOneProduct,
  deleteOneProduct,
};
