import { User } from "../models/User";

export type OmangaState = {
  user: User | undefined;
  productsSelectCategory: string[];
  productsSelectUniverse: string[];
  productSort: string;
  isLogged: boolean;
};

const OmangaDefaultState = (): OmangaState => {
  const defaultState: OmangaState = {
    user: undefined,
    productsSelectCategory: [],
    productsSelectUniverse: [],
    productSort: '',
    isLogged: false,
  }
  return defaultState;
}

export { OmangaDefaultState };

