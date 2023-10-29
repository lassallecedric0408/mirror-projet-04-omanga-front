export type User = {
  message?: string;
  user: {
    id: number | undefined;
    firstname: string | undefined;
    lastname: string | undefined;
    email: string | undefined;
    image_url: string | null | undefined;
    role: "USER" | "ADMIN";
    city?: string | null;
    zip_code?: string | null;
  };
  accessToken: string;
  refreshToken: string;
};

export type UserResponse = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  image_url: null | string;
  role: "USER" | "ADMIN";
  city: null | string;
  zip_code: null | string;
};
