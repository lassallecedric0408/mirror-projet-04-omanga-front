type UserBooking = {
  id: number;
  date: string;
  productName: string;
  price: number;
  productnumber: number;
  totalProductPrice: number;
};

export type User = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  dateOfBirth: string;
  is_admin: boolean;
  city: string;
  zipCode: string;
  bookings: UserBooking[];
};
