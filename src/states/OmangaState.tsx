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
      message: 'Connected user',
      user: {
        id: 31,
        firstname: 'Cedric',
        lastname: 'Lassalle',
        email: 'test@email.com',
        image_url: null,
        role: 'USER',
        city: null,
        zip_code: null,
      },
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
