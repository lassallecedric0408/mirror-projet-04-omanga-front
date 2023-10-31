import { create } from "zustand";
import { persist } from "zustand/middleware";
import { type User } from '../models/User';


type OmangaAuthStore = {
  user: User;
  isLogged: boolean;
  isAdmin: boolean;
  updateUser: (firstname: string, lastname: string, email: string, image_url: string | null, role: "USER" | "ADMIN", city: string | null, zip_code?: string | null) => void;
  logoutUser: () => void; // Fonction de déconnexion
};

const useAuthStore = create<OmangaAuthStore>()(
  persist(
    (set) => ({
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
      updateUser: (firstname: string, lastname: string, email: string, image_url: string | null, role: "USER" | "ADMIN", city?: string | null, zip_code?: string | null) => set((state) => ({
        ...state,
        user: {
          ...state.user,
          user: {
            ...state.user.user,
            firstname,
            lastname,
            email,
            image_url,
            role,
            city,
            zip_code
          },
        },
      })),
      logoutUser: () => {
        set({
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
        });
      },
    }),
    {
      name: "auth",
    }
  )
);

export default useAuthStore;