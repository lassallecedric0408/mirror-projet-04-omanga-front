import { type User, type UserResponse } from '../models/User'
import { refreshToken } from './refreshToken'

const API_URL = process.env.REACT_APP_API_URL

const getAllUsers = async (userMail: string | undefined): Promise<{
  data: UserResponse[]
}> => {
  const token = await refreshToken(userMail)
  const response = await fetch(API_URL + '/users', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token.data}`
    },
    mode: 'cors'
  })
  const data: UserResponse[] = await response.json();
  return { data }
}

interface LoginUser {
  email: string
  password: string
}

const loginUser = async ({ email, password }: LoginUser): Promise<{
  data: User
}> => {
  const token = localStorage.getItem(`accessToken/${email}`)
  const response = await fetch(API_URL + '/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    mode: 'cors',
    body: JSON.stringify({ email, password })
  })

  const data: User = await response.json()
  return { data }
}

interface SignUpUser {
  firstName: string
  lastName: string
  email: string
  password: string
  city?: string | null
  zipCode?: number | null
}
interface UserSignupBody {
  firstname: string
  lastname: string
  email: string
  password: string
  city?: null | string
  zip_code?: null | string
}
const signUpUser = async ({
  firstName,
  lastName,
  email,
  password,
  city,
  zipCode
}: SignUpUser): Promise<{
  data: User
}> => {
  const usersignup: UserSignupBody = {
    firstname: firstName,
    lastname: lastName,
    email,
    password
  }
  if (city !== null) {
    usersignup.city = city
  }
  if (zipCode !== null) {
    usersignup.zip_code = zipCode?.toString()
  }

  const response = await fetch(API_URL + '/users/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    mode: 'cors',
    body: JSON.stringify(usersignup)
  })

  const data: User = await response.json()
  return { data }
}

interface UpdateUser {
  firstName: string
  lastName: string
  email: string
  city?: string | null
  zipCode?: number | string
  id: number
}
interface UserUpdateBody {
  firstname: string;
  lastname: string;
  email: string;
  city?: null | string;
  zip_code?: number | string;
}

interface userUpdateReturn {
  message: string
  result: {
    id: number
    firstname: string
    lastname: string
    email: string
    image_url: null | string
    role: 'USER' | 'ADMIN'
    city: null | string
    zip_code: null | string
  }
}

const updateUser = async ({
  firstName,
  lastName,
  email,
  city,
  zipCode,
  id
}: UpdateUser): Promise<{
  data: userUpdateReturn
}> => {
  const userUpdate: UserUpdateBody = {
    firstname: firstName,
    lastname: lastName,
    email,
    city,
    zip_code: zipCode?.toString()
  }

  const token = await refreshToken(email)
  const response = await fetch(`${API_URL}/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token.data}`
    },
    mode: 'cors',
    body: JSON.stringify(userUpdate)
  })

  const data: userUpdateReturn = await response.json()
  return { data }
}

const deleteOneUser = async (id: number, userMail: string | undefined): Promise<{
  data: any
}> => {
  const token = await refreshToken(userMail)
  const response = await fetch(`${API_URL}/users/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token.data}`
    },
    mode: 'cors'
  })
  const data = await response.json()
  return { data }
}

const deleteOneUserOrder = async (id: number, userMail: string | undefined): Promise<any> => {
  const token = await refreshToken(userMail)
  const response = await fetch(`/users/order/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token.data}`
    },
    mode: 'cors'
  })
  return await response.json()
}

export {
  getAllUsers,
  loginUser,
  signUpUser,
  updateUser,
  deleteOneUser,
  deleteOneUserOrder
}
