import { Booking } from "../models/Booking";

const API_URL = 'http://localhost:3005';

const getAllBookings = async () => {
  try {
    const response = await fetch(API_URL + '/orders', {
      method: 'GET'
    });
    const data: Booking[] = await response.json();
    return { data: data };
  } catch (error) {
    throw new Error(`Get all products failed: ${(error as Error).message}`);
  }
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
}
const createOneBooking = async ({ productQuantity, productId, userId, userMail }: CreateOneBooking) => {
  const userBooking: UserBooking = {
    product_quantity: productQuantity,
    product_id: productId,
    user_id: userId
  }

  const response = await fetch(`${API_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'accessToken' + userMail,
    },
    body: JSON.stringify(userBooking),
  });
  const data = await response.json();
  console.log(data);
  return { data };
};

const updateOneBooking = async (id: number, order: any) => {
  const response = await fetch(`${API_URL}/orders/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      // 'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(order),
  });

  if (!response.ok) {
    throw new Error('Order updated failed');
  }

  const data = await response.json();

  return data;
};

const deleteOneBooking = async (id: number, userMail: string | undefined) => {
  console.log('lancement de la suppression');
  const response = await fetch(API_URL + '/orders/' + id, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'accessToken' + userMail,
    },
  });
  const data = await response.json();
  console.log(data);
  return { data };
};

export { getAllBookings, createOneBooking, updateOneBooking, deleteOneBooking };
