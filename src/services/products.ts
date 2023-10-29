import { type Product } from '../models/Product'
import { refreshToken } from './refreshToken'

const API_URL = process.env.REACT_APP_API_URL

interface GetAllProductsReturn {
  data: Product[]
}

const getAllProducts = async (): Promise<GetAllProductsReturn> => {
  console.log(API_URL, 'API_URL')
  const response = await fetch(`${API_URL}/products`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': `${API_URL}`
    }
  })
  const data = await response.json()
  return { data }
}

const getOneProduct = async (id: number): Promise<{
  data: Product
}> => {
  const response = await fetch(API_URL + '/products/' + id, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': `${API_URL}`
    }
  })
  const data: Product = await response.json()
  return { data }
}
interface productRequest {
  stock: number
  name: string
  description: string
  image_url: string | undefined
  price: number
  category_id: number
  universe_id: number
}

interface productResponse {
  message: string
  result: {
    id: number
    stock: number
    name: string
    description: string
    image_url: string
    price: string
    created_at: string
    updated_at: string
    category_id: number
    universe_id: number
  }
}

const createOneProduct = async (
  productRequest: productRequest,
  userMail: string | undefined,
  userId: number | undefined
): Promise<{
  data: productResponse
}> => {
  const token = await refreshToken(userMail)
  console.log(productRequest, 'productRequest')
  const response = await fetch(`${API_URL}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token.data}`,
      'Access-Control-Allow-Origin': `${API_URL}`
    },
    body: JSON.stringify(productRequest)
  })
  const data: productResponse = await response.json()
  console.log(data, 'creteOneProduct')
  return { data }
}

const updateOneProduct = async (
  id: number | undefined,
  productRequest: productRequest,
  userMail: string | undefined,
  userId: number | undefined
): Promise<{
  data: productResponse
}> => {
  const token = await refreshToken(userMail)

  const response = await fetch(`${API_URL}/products/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token.data}`,
      'Access-Control-Allow-Origin': `${API_URL}`
    },
    body: JSON.stringify(productRequest)
  })
  const data: productResponse = await response.json()
  console.log(data)
  return { data }
}

const deleteOneProduct = async (id: number, userMail: string | undefined): Promise<{
  data: productResponse
}> => {
  const token = await refreshToken(userMail)
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token.data}`,
      'Access-Control-Allow-Origin': `${API_URL}`
    }
  })
  const data: productResponse = await response.json()
  console.log(data)
  return { data }
}

export {
  getAllProducts,
  getOneProduct,
  createOneProduct,
  updateOneProduct,
  deleteOneProduct
}
