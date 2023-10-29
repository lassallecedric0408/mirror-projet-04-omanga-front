import { type Review } from '../models/Review'

const API_URL = process.env.REACT_APP_API_URL

interface CreateOneReview {
  comment: string
  productId: number | undefined
  userId: number | undefined
  userMail: string | undefined
}
interface UserReview {
  content: string
  product_id: number | undefined
  user_id: number | undefined
  rating: number | undefined
}

const createOneReview = async ({
  comment,
  productId,
  userId,
  userMail
}: CreateOneReview): Promise<{
  data: Review
}> => {
  const userReview: UserReview = {
    content: comment,
    product_id: productId,
    user_id: userId,
    rating: 0
  }
  const token = localStorage.getItem(`accessToken/${userMail}`)
  const response = await fetch(
    `${API_URL}/reviews/users/${userId?.toString()}/products/${productId?.toString()}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      mode: 'cors',
      body: JSON.stringify(userReview)
    }
  )
  const data: Review = await response.json()
  return { data }
}

export { createOneReview }
