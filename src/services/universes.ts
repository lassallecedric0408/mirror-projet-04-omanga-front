import { type Universe, type UniverseRequest } from "../models/Universe";
import { refreshToken } from "./refreshToken";

const API_URL = process.env.REACT_APP_API_URL;

const getAllUniverses = async (): Promise<{
  data: Universe[];
}> => {
  const response = await fetch(`${API_URL}/universes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
  });
  const data: Universe[] = await response.json();
  return { data };
};

type UniverseResponse = {
  message: string;
  result: {
    name: string;
    image_url: string;
  };
};

const createOneUniverse = async (
  universe: UniverseRequest,
  email: string | undefined,
): Promise<{
  data: UniverseResponse;
}> => {
  const token = await refreshToken(email);
  const response = await fetch(`${API_URL}/universes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.data}`,
    },
    mode: "cors",
    body: JSON.stringify(universe),
  });
  const data: UniverseResponse = await response.json();
  return { data };
};

const updateOneUniverse = async (
  id: number | undefined,
  universe: UniverseRequest,
  email: string | undefined,
): Promise<{
  data: UniverseResponse;
}> => {
  const token = await refreshToken(email);
  const response = await fetch(`${API_URL}/universes${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.data}`,
    },
    mode: "cors",
    body: JSON.stringify(universe),
  });
  const data: UniverseResponse = await response.json();
  return { data };
};

const deleteOneUniverse = async (
  id: number,
  email: string | undefined,
): Promise<{
  data: any;
}> => {
  const token = await refreshToken(email);
  const response = await fetch(`${API_URL}/universes/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.data}`,
    },
  });
  const data = await response.json();
  return { data };
};

export {
  getAllUniverses,
  createOneUniverse,
  updateOneUniverse,
  deleteOneUniverse,
};
