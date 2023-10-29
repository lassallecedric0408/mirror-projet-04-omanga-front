export type Category = {
  id: number;
  name: string;
  image_url: string;
  created_at: string;
};

export type CategoryRequest = {
  name: string;
  image_url: string | undefined;
};
