import { User } from '../models/User';
const API_URL = 'http://localhost:3005';
// const { REACT_APP_API_URL } = process.env;
// const essai = REACT_APP_API_URL;

type LoginUser = {
  email: string;
  password: string;
};
type refreshTokenUserReturn = {
  message: string;
  accessToken: string;
  refreshToken: string;
}

const loginUser = async ({ email, password }: LoginUser) => {
  const refreshToken = localStorage.getItem(`refreshToken/${email}`);
  const refreshTokenBody = {
    refreshToken: refreshToken
  }
  const refreshUserToken = await fetch(API_URL + "/users/login", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(refreshTokenBody),
  });

  const dataRefreshToken: refreshTokenUserReturn = await refreshUserToken.json();

  localStorage.setItem(`accessToken/${email}`, dataRefreshToken.accessToken);
  localStorage.setItem(`refreshToken/${email}`, dataRefreshToken.refreshToken);

  const token = localStorage.getItem(`accessToken/${email}`);

  const response = await fetch(API_URL + "/users/login", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${token}`,
    },
    body: JSON.stringify({ email, password }),
  });

  const data: User = await response.json();
  return { data: data };
};

type SignUpUser = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  city?: string | null;
  zipCode?: number | null;
};
type UserSignupBody = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  city?: null | string;
  zip_code?: null | string;
}
const signUpUser = async ({
  firstName,
  lastName,
  email,
  password,
  city,
  zipCode,
}: SignUpUser) => {
  const usersignup: UserSignupBody = {
    firstname: firstName,
    lastname: lastName,
    email: email,
    password: password,
  };
  if (city !== null) {
    usersignup.city = city;
  }
  if (zipCode !== null) {
    usersignup.zip_code = zipCode?.toString();
  }

  const response = await fetch(API_URL + "/users/signup", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(usersignup),
  });

  const data: User = await response.json();
  return { data: data };
}

type UpdateUser = {
  firstName: string;
  lastName: string;
  email: string;
  city?: string | null;
  zipCode?: number | string;
  id: number;
};
type UserUpdateBody = {
  firstname: string;
  lastname: string;
  email: string;
  city?: null | string;
  zip_code?: number | string;
}

type userUpdateReturn = {

  message: string;
  result: {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    image_url: null | string;
    role: "USER" | "ADMIN";
    city: null | string;
    zip_code: null | string;
  }

}
const updateUser = async ({
  firstName,
  lastName,
  email,
  city,
  zipCode,
  id
}: UpdateUser) => {
  const userUpdate: UserUpdateBody = {
    firstname: firstName,
    lastname: lastName,
    email: email,
    city: city,
    zip_code: zipCode?.toString(),
  };
  const token = localStorage.getItem(`accessToken/${email}`);
  console.log(token, 'token');
  const response = await fetch(API_URL + "/users/" + id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${token}`,
    },
    body: JSON.stringify(userUpdate),
  });

  const data: userUpdateReturn = await response.json();
  return { data: data };
}

type DeleteUser = {
  id: number;
};

const deleteOneUser = async ({ id }: DeleteUser) => {
  const response = await fetch(`/users/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': ``,
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
      'Authorization': ``,
    },
  });

  if (!response.ok) {
    throw new Error('User deletion failed');
  }

  const data = await response.json();

  return data;
};


export { loginUser, signUpUser, updateUser, deleteOneUser, deleteOneUserOrder };
