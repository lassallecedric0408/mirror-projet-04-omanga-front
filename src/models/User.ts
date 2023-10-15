export type User = {
  message?: string;
  user: {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    image_url: string | null | undefined;
    role: "USER" | "ADMIN";
    city?: string | null;
    zip_code?: string | null;
  },
  accessToken: string;
  refreshToken: string;
};
