import { User } from "../models/User";

export type OmangaState = {
  user: User | undefined;
  productsSelectCategory: string[];
  productsSelectUniverse: string[];
  productSort: string;
};

const OmangaDefaultState = (): OmangaState => {
  const defaultState: OmangaState = {
    user: undefined,
    productsSelectCategory: [],
    productsSelectUniverse: [],
    productSort: ''
  }
  return defaultState;
}

export { OmangaDefaultState };

