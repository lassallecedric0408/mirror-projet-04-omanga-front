interface SetLoggedUser {
  type: 'SET_LOGGED_USER';
  id: number | undefined;
  firstname: string | undefined;
  lastname: string | undefined;
  email: string | undefined;
  image_url: string | undefined | null;
  role: 'USER' | 'ADMIN';
  city?: string | undefined | null;
  zip_code?: string | undefined | null;
  isLogged: boolean;
  isAdmin: boolean;
}

interface SetUpdateUser {
  type: 'SET_UPDATE_USER';
  firstname: string | undefined;
  lastname: string | undefined;
  email: string | undefined;
  image_url: string | undefined | null;
  city?: string | undefined | null;
  zip_code?: string | undefined | null;
}

interface SetLogoutUser {
  type: 'SET_LOGOUT_USER';
  id: number | undefined;
  firstname: string | undefined;
  lastname: string | undefined;
  email: string | undefined;
  image_url: string | undefined | null;
  role: 'USER' | 'ADMIN';
  city?: string | undefined | null;
  zip_code?: string | undefined | null;
  isLogged: boolean;
  isAdmin: boolean;
}

export type OmangaActions = SetLoggedUser | SetUpdateUser | SetLogoutUser;
