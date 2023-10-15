type SetLoggedUser = {
  type: 'SET_LOGGED_USER';
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  image_url: string | undefined | null;
  role: 'USER' | 'ADMIN';
  city?: string | undefined | null;
  zip_code?: string | undefined | null;
};

type SetUpdateUser = {
  type: 'SET_UPDATE_USER';
  firstname: string;
  lastname: string;
  email: string;
  image_url: string | undefined | null;
  city?: string | undefined | null;
  zip_code?: string | undefined | null;
};
export type OmangaActions = SetLoggedUser | SetUpdateUser;
