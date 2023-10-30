import { type Booking } from '../models/Booking'
import { type Category } from '../models/Category'
import { type Product } from '../models/Product'
import { type Universe } from '../models/Universe'
import { type User } from '../models/User'
import { refreshToken } from './refreshToken'

const API_URL = process.env.REACT_APP_API_URL

interface AdminDashBoardReturn {
  categories: Category[]
  orders: Booking[]
  products: Product[]
  universes: Universe[]
  users: User[]
}

const getAdminDashBoard = async (userMail: string | undefined): Promise<{
  data: AdminDashBoardReturn
}> => {
  const token = await refreshToken(userMail)
  const response = await fetch(`${API_URL}/admin/dashboard`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token.data}`
    },
    mode: 'cors'
  })
  const data: AdminDashBoardReturn = await response.json()
  return { data }
}

export { getAdminDashBoard }
