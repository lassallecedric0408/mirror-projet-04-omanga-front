import { Booking } from "../models/Booking";
import { refreshToken } from "./refreshToken";

const API_URL = process.env.REACT_APP_API_URL;

const getAllBookings = async (
  email: string | undefined,
): Promise<{
  data: Booking[];
}> => {
  const token = await refreshToken(email);
  const response = await fetch(`${API_URL}/orders`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.data}`,
    },
    mode: "cors",
  });
  const data: Booking[] = await response.json();
  return { data };
};

const getUserBookings = async (
  id: number | undefined,
  email: string | undefined,
): Promise<{
  data: Booking[];
}> => {
  const token = await refreshToken(email);
  const response = await fetch(`${API_URL}/orders/users/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.data}`,
    },
    mode: "cors",
  });
  const data: Booking[] = await response.json();
  return { data };
};

type CreateOneBooking = {
  productQuantity: number | undefined;
  productId: number | undefined;
  userId: number | undefined;
  userMail: string | undefined;
};
type UserBooking = {
  product_quantity: number | undefined;
  product_id: number | undefined;
  user_id: number | undefined;
};

const createOneBooking = async ({
  productQuantity,
  productId,
  userId,
  userMail,
}: CreateOneBooking): Promise<{
  data: Booking;
}> => {
  const userBooking: UserBooking = {
    product_quantity: productQuantity,
    product_id: productId,
    user_id: userId,
  };

  const token = await refreshToken(userMail);

  const response = await fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.data}`,
    },
    mode: "cors",
    body: JSON.stringify(userBooking),
  });

  const data: Booking = await response.json();

  return { data };
};

const updateOneBooking = async (
  id: number,
  order: any,
  email: string | undefined,
): Promise<{
  data: any;
}> => {
  const token = await refreshToken(email);
  const response = await fetch(`${API_URL}/orders/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.data}`,
    },
    mode: "cors",
    body: JSON.stringify(order),
  });
  const data = await response.json();
  return { data };
};

const deleteOneBooking = async (
  id: number,
  userId: number,
  email: string | undefined,
): Promise<{
  data: any;
}> => {
  const token = await refreshToken(email);
  const response = await fetch(`${API_URL}/orders/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.data}`,
    },
    mode: "cors",
    body: JSON.stringify({ user_id: userId }),
  });
  const data = await response.json();
  return { data };
};

export {
  getAllBookings,
  getUserBookings,
  createOneBooking,
  updateOneBooking,
  deleteOneBooking,
};
