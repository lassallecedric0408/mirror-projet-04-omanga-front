const API_URL = process.env.REACT_APP_API_URL;
const token = localStorage.getItem('token');

const getAllCategories = async () => {
  const response = await fetch(`${API_URL}/categories`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Get all categories failed');
  }

  const data = await response.json();

  return data;
};

const createOneCategory = async (category: any) => {
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

const updateOneCategory = async (id: number, order: any) => {
  const response = await fetch(`${API_URL}/categories/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(order),
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
