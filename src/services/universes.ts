const API_URL = process.env.REACT_APP_API_URL;
const token = localStorage.getItem('token');

const getAllUniverses = async () => {
  const response = await fetch(`${API_URL}/universes`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Get all universe failed');
  }

  const data = await response.json();

  return data;
};

const createOneUniverse = async (universe: any) => {
  const response = await fetch(`${API_URL}/universes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(universe),
  });

  if (!response.ok) {
    throw new Error('Universe creation failed');
  }

  const data = await response.json();

  return data;
};

const updateOneUniverse = async (id: number, universe: any) => {
  const response = await fetch(`${API_URL}/universes/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(universe),
  });

  if (!response.ok) {
    throw new Error('Universe updated failed');
  }

  const data = await response.json();

  return data;
};

const deleteOneUniverse = async (id: number) => {
  const response = await fetch(`${API_URL}/universes/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Universe deletion failed');
  }

  const data = await response.json();

  return data;
};

export {
  getAllUniverses,
  createOneUniverse,
  updateOneUniverse,
  deleteOneUniverse,
};
