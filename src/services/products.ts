import { Product } from "../models/Product";

// const API_URL = process.env.REACT_APP_API_URL;
const API_URL = 'http://localhost:3005';
const token = localStorage.getItem('token');

const getAllProducts = async () => {
  try {
    const response = await fetch(`${API_URL}/products`, {
      method: 'GET'
    });
    const data = await response.json();
    return { data: data };
  } catch (error) {
    throw new Error(`Get all products failed: ${(error as Error).message}`);
  }
};

const getOneProduct = async (id: number) => {
  try {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: 'GET',
    });

    const data: Product = await response.json();

    return { data: data };

  } catch (error) {
    throw new Error(`Get all products failed: ${(error as Error).message}`);
  }
};

const createOneProduct = async (product: Product) => {
  const response = await fetch(`${API_URL}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    throw new Error('Product creation failed');
  }

  const data = await response.json();

  return data;
};

const updateOneProduct = async (id: number, product: any) => {
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    throw new Error('Product updated failed');
  }

  const data = await response.json();

  return data;
};

const deleteOneProduct = async (id: number) => {
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Product deletion failed');
  }

  const data = await response.json();

  return data;
};

export {
  getAllProducts,
  getOneProduct,
  createOneProduct,
  updateOneProduct,
  deleteOneProduct,
};
