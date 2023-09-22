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

export type OmangaActions =
  | SetProductsSelectCategory
  | SetProductsSelectUniverse
  | SetProductsSelectSort