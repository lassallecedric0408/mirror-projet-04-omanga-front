import { User } from '../models/User';

export type OmangaState = {
  user: User | undefined;
};

const OmangaDefaultState = (): OmangaState => {
  const defaultState: OmangaState = {
    user: {
      message: '',
      user: {
        id: 1,
        firstname: '',
        lastname: '',
        email: '',
        image_url: '',
        role: 'USER',
        city: '',
        zip_code: '',
      },
      accessToken: '',
      refreshToken: '',
    },
  };
  return defaultState;
};

export { OmangaDefaultState };
