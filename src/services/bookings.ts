const API_URL = process.env.REACT_APP_API_URL;
const token = localStorage.getItem('token');

const getAllBookings = async () => {
  const response = await fetch(`${API_URL}/orders`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Get all orders failed');
  }

  const data = await response.json();

  return data;
};

const createOneBooking = async (product: any) => {
  const response = await fetch(`${API_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    throw new Error('Order creation failed');
  }

  const data = await response.json();

  return data;
};

const updateOneBooking = async (id: number, order: any) => {
  const response = await fetch(`${API_URL}/orders/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(order),
  });

  if (!response.ok) {
    throw new Error('Order updated failed');
  }

  const data = await response.json();

  return data;
};

const deleteOneBooking = async (id: number) => {
  const response = await fetch(`${API_URL}/orders/${id}`, {
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

export { getAllBookings, createOneBooking, updateOneBooking, deleteOneBooking };
