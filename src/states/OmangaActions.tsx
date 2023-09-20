type SetA = {
  type: 'SET_A';
  essai: boolean;
};

type SetB = {
  type: 'SET_B';
  essai: number;
};

type SetC = {
  type: 'SET_C';
  essai: string;
};

export type OmangaActions =
  | SetA
  | SetB
  | SetC