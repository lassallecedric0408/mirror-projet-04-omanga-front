import { User } from '../models/User';

export type OmangaState = {
  user: User | undefined;
  productsSelectCategory: string[];
  productsSelectUniverse: string[];
  productSort: string;
  isLogged: boolean;
  isAdmin: boolean;
};

const OmangaDefaultState = (): OmangaState => {
  const defaultState: OmangaState = {
    user: {
      id: 1,
      firstname: 'John',
      lastname: 'Doe',
      email: 'john.doe@email.com',
      dateOfBirth: '2000-01-01',
      is_admin: true,
      city: 'Paris',
      zipCode: '75000',
      bookings: [
        {
          id: 1,
          date: '2023-10-10',
          productName: 'Article 1',
          price: 15,
          productnumber: 2,
          totalProductPrice: 30,
        },
        {
          id: 2,
          date: '2023-10-10',
          productName: 'Article 2',
          price: 15,
          productnumber: 2,
          totalProductPrice: 30,
        },
        {
          id: 3,
          date: '2023-10-10',
          productName: 'Article 3',
          price: 15,
          productnumber: 2,
          totalProductPrice: 30,
        },
      ],
    },
    productsSelectCategory: [],
    productsSelectUniverse: [],

    productSort: '',
    isLogged: false,
    isAdmin: true,
  };
  return defaultState;
};

export { OmangaDefaultState };
