import { Reducer } from "react";
import { OmangaActions } from "./OmangaActions";
import { OmangaState } from "./OmangaState";

const OmangaReducer: Reducer<OmangaState, OmangaActions> = (prevState, action) => {
  const newState = { ...prevState };
  switch (action.type) {
    case 'SET_PRODUCTS_SELECT_CATEGORY': {
      newState.productsSelectCategory = action.categoryItems;
      break;
    }
    case 'SET_PRODUCTS_SELECT_UNIVERSE': {
      newState.productsSelectUniverse = action.universeItems;
      break;
    }
    case 'SET_PRODUCTS_SELECT_SORT': {
      newState.productSort = action.sortItems;
      break;
    }
    default: {
      throw new Error(`invalid action:`);
    }
  }

  return newState;
};

export { OmangaReducer };

