import { Reducer } from "react";
import { OmangaActions } from "./OmangaActions";
import { OmangaState } from "./OmangaState";

const OmangaReducer: Reducer<OmangaState, OmangaActions> = (
  prevState,
  action,
) => {
  const newState = { ...prevState };
  switch (action.type) {
    case "SET_LOGGED_USER": {
      if (newState.user) {
        newState.user.user.id = action.id;
        newState.user.user.firstname = action.firstname;
        newState.user.user.lastname = action.lastname;
        newState.user.user.email = action.email;
        newState.user.user.image_url = action.image_url;
        newState.user.user.role = action.role;
        newState.user.user.city = action.city;
        newState.user.user.zip_code = action.zip_code;
        newState.isLogged = action.isLogged;
        newState.isAdmin = action.isAdmin;
      }
      break;
    }
    case "SET_UPDATE_USER": {
      if (newState.user) {
        newState.user.user.firstname = action.firstname;
        newState.user.user.lastname = action.lastname;
        newState.user.user.email = action.email;
        newState.user.user.image_url = action.image_url;
        newState.user.user.city = action.city;
        newState.user.user.zip_code = action.zip_code;
      }
      break;
    }
    case "SET_LOGOUT_USER": {
      if (newState.user) {
        newState.user.user.id = action.id;
        newState.user.user.firstname = action.firstname;
        newState.user.user.lastname = action.lastname;
        newState.user.user.email = action.email;
        newState.user.user.image_url = action.image_url;
        newState.user.user.role = action.role;
        newState.user.user.city = action.city;
        newState.user.user.zip_code = action.zip_code;
        newState.isLogged = action.isLogged;
        newState.isAdmin = action.isAdmin;
      }
      break;
    }
    default: {
      throw new Error(`invalid action:`);
    }
  }

  return newState;
};

export { OmangaReducer };
