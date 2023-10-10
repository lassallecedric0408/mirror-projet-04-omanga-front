import bcrypt from 'bcryptjs';
const API_URL = process.env.REACT_APP_API_URL;
const token = localStorage.getItem('token');

type LoginUser = {
  email: string;
  password: string;
};

const loginUser = async ({ email, password }: LoginUser) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const response = await fetch(`${API_URL}/user/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password: hashedPassword }),
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  const data = await response.json();

  return data;
};

type SignUpUser = {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  password: string;
  city: string;
  zipCode: number | undefined;
};

async function signUpUser({
  firstName,
  lastName,
  dateOfBirth,
  email,
  password,
  city,
  zipCode,
}: SignUpUser) {
  const hashedPassword = await bcrypt.hash(password, 10);

  const response = await fetch(`${API_URL}/orders/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      firstName,
      lastName,
      dateOfBirth,
      email,
      city,
      zipCode,
      password: hashedPassword,
    }),
  });

  if (!response.ok) {
    throw new Error('Registration failed');
  }

  const data = await response.json();

  return data;
}

type DeleteUser = {
  id: number;
};

const deleteOneUser = async ({ id }: DeleteUser) => {
  const response = await fetch(`/users/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('User deletion failed');
  }

  const data = await response.json();

  return data;
};

type DeleteUserOrder = {
  id: number;
};

const deleteOneUserOrder = async ({ id }: DeleteUserOrder) => {
  const response = await fetch(`/users/order/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('User deletion failed');
  }

  const data = await response.json();

  return data;
};


export { loginUser, signUpUser, deleteOneUser, deleteOneUserOrder };
