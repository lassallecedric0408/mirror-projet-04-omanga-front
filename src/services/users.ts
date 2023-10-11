import bcrypt from 'bcryptjs';
// const API_URL = process.env.REACT_APP_API_URL;
const API_URL = 'http://localhost:3005';
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
  dateOfBirth?: string;
  email: string;
  password: string;
  city?: string | null;
  zipCode?: number | null;
};
type usersignupBody = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  city?: null | string;
  zip_code?: null | string;
}
async function signUpUser({
  firstName,
  lastName,
  email,
  password,
  city,
  zipCode,
}: SignUpUser) {
  // const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const usersignup: usersignupBody = {
      firstname: firstName,
      lastname: lastName,
      email: email,
      password: password,
    };
    // if (city !== null) {
    //   usersignup.city = city;
    // }
    // if (zipCode !== null) {
    //   usersignup.zip_code = `${zipCode}`;
    // }
    console.log(usersignup);
    const response = await fetch(`http://localhost:3005/users/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(usersignup),
    });

    if (!response.ok) {
      throw new Error('SignUp failed');
    }

    const data = await response.json();

    return { data: data };
  } catch (error) {
    throw new Error(`User signup failed: ${(error as Error).message}`);
  }
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
