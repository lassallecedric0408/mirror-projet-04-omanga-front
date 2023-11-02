import { type User } from "../models/User";
import useAuthStore from "./OmangaStore";

export type OmangaState = {
  user: User | undefined;
  isLogged: boolean;
  isAdmin: boolean;
};

const OmangaDefaultState = (): OmangaState => {
  const defaultState: OmangaState = {
    user: {
      message: "",
      user: {
        id: 1,
        firstname: "",
        lastname: "",
        email: "",
        image_url: "",
        role: "USER",
        city: "",
        zip_code: "",
      },
      accessToken: "",
      refreshToken: "",
    },
    isLogged: false,
    isAdmin: false,
  };
  return defaultState;
};

export { OmangaDefaultState };
