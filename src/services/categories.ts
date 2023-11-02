import { type Category, type CategoryRequest } from "../models/Category";
import { refreshToken } from "./refreshToken";

const API_URL = process.env.REACT_APP_API_URL;

const getAllCategories = async (): Promise<{
  data: Category[];
}> => {
  const response = await fetch(`${API_URL}/categories`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
  });
  const data: Category[] = await response.json();
  return { data };
};

type CategoryResponse = {
  message: string;
  result: {
    name: string;
    image_url: string;
  };
};

const createOneCategory = async (
  category: CategoryRequest,
  email: string | undefined,
): Promise<{
  data: CategoryResponse;
}> => {
  const token = await refreshToken(email);
  const response = await fetch(`${API_URL}/categories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.data}`,
    },
    mode: "cors",
    body: JSON.stringify(category),
  });
  const data: CategoryResponse = await response.json();
  return { data };
};

const updateOneCategory = async (
  id: number | undefined,
  category: CategoryRequest,
  email: string | undefined,
): Promise<{
  data: CategoryResponse;
}> => {
  const token = await refreshToken(email);
  const response = await fetch(`${API_URL}/categories/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.data}`,
    },
    mode: "cors",
    body: JSON.stringify(category),
  });
  const data: CategoryResponse = await response.json();
  return { data };
};

const deleteOneCategory = async (
  id: number,
  email: string | undefined,
): Promise<{
  data: any;
}> => {
  const token = await refreshToken(email);
  const response = await fetch(`${API_URL}/categories/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.data}`,
    },
    mode: "cors",
  });
  const data = await response.json();
  return { data };
};

export {
  getAllCategories,
  createOneCategory,
  updateOneCategory,
  deleteOneCategory,
};
