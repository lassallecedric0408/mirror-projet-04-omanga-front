type SetProductsSelectCategory = {
  type: 'SET_PRODUCTS_SELECT_CATEGORY';
  categoryItems: string[];
};

type SetProductsSelectUniverse = {
  type: 'SET_PRODUCTS_SELECT_UNIVERSE';
  universeItems: string[];
};

type SetProductsSelectSort = {
  type: 'SET_PRODUCTS_SELECT_SORT';
  sortItems: string;
};
type SetUserISLogged = {
  type: 'SET_USER_IS_LOGGED';
  userIsLogged: boolean;
};
type SetUserIsAdmin = {
  type: 'SET_USER_IS_ADMIN';
  userIsAdmin: boolean;
};
export type OmangaActions =
  | SetProductsSelectCategory
  | SetProductsSelectUniverse
  | SetProductsSelectSort
  | SetUserISLogged
  | SetUserIsAdmin;