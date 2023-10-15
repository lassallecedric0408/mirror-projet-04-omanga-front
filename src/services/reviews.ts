const API_URL = 'http://localhost:3005';

type CreateOneReview = {
  comment: string;
  productId: number | undefined;
  userId: number | undefined;
  userMail: string | undefined;
};
type UserReview = {
  content: string;
  product_id: number | undefined;
  user_id: number | undefined;
  rating: number | undefined;
}
const createOneReview = async ({ comment, productId, userId, userMail }: CreateOneReview) => {
  const userBooking: UserReview = {
    content: comment,
    product_id: productId,
    user_id: userId,
    rating: 0
  }
  const response = await fetch(API_URL + '/reviews/users/' + userId?.toString() + '/products/' + productId?.toString(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'accessToken' + userMail,
    },
    body: JSON.stringify(userBooking),
  });
  const data = await response.json();

  return { data };
};

export { createOneReview };
