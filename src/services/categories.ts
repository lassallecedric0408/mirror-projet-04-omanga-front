import { Category } from "../models/Category";

const API_URL = 'http://localhost:3005';
const token = localStorage.getItem('accessToken');

const getAllCategories = async () => {
  const response = await fetch(API_URL + '/categories', {
    method: 'GET'
  });
  const data: Category[] = await response.json();
  return { data };
};

const createOneCategory = async (category: Category) => {
  const response = await fetch(`${API_URL}/categories`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(category),
  });

  if (!response.ok) {
    throw new Error('Category creation failed');
  }

  const data = await response.json();

  return data;
};

const updateOneCategory = async (id: number, category: Category) => {
  const response = await fetch(`${API_URL}/categories/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(category),
  });

  if (!response.ok) {
    throw new Error('Category updated failed');
  }

  const data = await response.json();

  return data;
};

const deleteOneCategory = async (id: number) => {
  const response = await fetch(`${API_URL}/categories/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Category deletion failed');
  }

  const data = await response.json();

  return data;
};

export { getAllCategories, createOneCategory, updateOneCategory, deleteOneCategory };
