import { User } from "../models/User";

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
    user: undefined,
    productsSelectCategory: [],
    productsSelectUniverse: [],
    productSort: '',
    isLogged: false,
    isAdmin: true,
  }
  return defaultState;
}

export { OmangaDefaultState };

