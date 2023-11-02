import { type Review } from "../models/Review";
import { refreshToken } from "./refreshToken";

const API_URL = process.env.REACT_APP_API_URL;

type CreateOneReview = {
  comment: string;
  productId: number | undefined;
  userId: number | undefined;
  userMail: string | undefined;
};
type UserReview = {
  content: string;
  user_id: number | undefined;
  rating: number | undefined;
};

const createOneReview = async ({
  comment,
  productId,
  userId,
  userMail,
}: CreateOneReview): Promise<{
  data: Review;
}> => {
  const userReview: UserReview = {
    content: comment,
    user_id: userId,
    rating: 0,
  };
  const token = await refreshToken(userMail);
  const response = await fetch(
    `${API_URL}/reviews/users/${userId?.toString()}/products/${productId?.toString()}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.data}`,
      },
      mode: "cors",
      body: JSON.stringify(userReview),
    },
  );
  const data: Review = await response.json();
  return { data };
};

export { createOneReview };
