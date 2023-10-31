import { readUserDataFromIndexedDB } from '../hooks/DBConfig';
import { type User } from '../models/User';

export interface OmangaState {
  user: User | undefined;
  isLogged: boolean;
  isAdmin: boolean;
}

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
    isLogged: false,
    isAdmin: false,
  };

  readUserDataFromIndexedDB().then((userData: User) => {
    if (userData) {
      defaultState.user = {
        message: userData.message,
        user: {
          id: userData.user.id,
          firstname: userData.user.firstname,
          lastname: userData.user.lastname,
          email: userData.user.email,
          image_url: userData.user.image_url,
          role: userData.user.role,
          city: userData.user.city,
          zip_code: userData.user.zip_code,
        },
        accessToken: userData.accessToken,
        refreshToken: userData.refreshToken,
      };
      defaultState.isLogged = true;
      defaultState.isAdmin = userData.user.role === 'ADMIN' ? true : false;
    }
  });

  return defaultState;
};

export { OmangaDefaultState };
