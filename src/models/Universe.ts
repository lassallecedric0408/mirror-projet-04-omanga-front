export type Universe = {
  id: number;
  name: string;
  image_url: string;
  created_at: string;
};

export type UniverseRequest = {
  name: string;
  image_url: string | undefined;
};
