import { Booking } from "../models/Booking";
import { refreshToken } from "./refreshToken";

const API_URL = process.env.REACT_APP_API_URL;

const getAllBookings = async (email: string) => {
  await refreshToken(email);
  const token = localStorage.getItem(`accessToken/${email}`);
  const response = await fetch(`${API_URL}/orders`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    mode: 'cors'
  });
  const data: Booking[] = await response.json();
  console.log(data, "getAllBookings");
  return { data: data };
};

const getUserBookings = async (
  email: string | undefined,
  id: number | undefined,
) => {
  await refreshToken(email);
  const token = localStorage.getItem(`accessToken/${email}`);
  console.log(`${API_URL}/orders/${id}`);
  const response = await fetch(`${API_URL}/orders/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    mode: 'cors'
  });
  const data: Booking[] = await response.json();
  console.log(data, "getUserBookings");
  return { data: data };
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
}: CreateOneBooking) => {
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
      Authorization: `Bearer ${token}`,
    },
    mode: 'cors',
    body: JSON.stringify(userBooking),
  });

  const data: Booking = await response.json();

  return { data };
};

const updateOneBooking = async (
  id: number,
  order: any,
  userMail: string | undefined,
) => {
  const token = await refreshToken(userMail);
  const response = await fetch(`${API_URL}/orders/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.data}`
    },
    mode: 'cors',
    body: JSON.stringify(order),
  });
  const data = await response.json();
  return data;
};

const deleteOneBooking = async (
  id: number,
  userId: number,
  userMail: string | undefined,
) => {
  const token = await refreshToken(userMail);
  const response = await fetch(`${API_URL}/orders/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.data}`
    },
    mode: 'cors',
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
