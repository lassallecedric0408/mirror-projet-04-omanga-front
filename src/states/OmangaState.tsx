import { User } from "../models/User";

export type OmangaState = {
  user: User | undefined;
};

const OmangaDefaultState = (): OmangaState => {
  const defaultState: OmangaState = {
    user: undefined,
  }
  return defaultState;
}

export { OmangaDefaultState };

