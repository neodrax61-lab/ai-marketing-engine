export type AdItem = {
  id: string;
  headline: string;
  texto: string;
  cta: string;
};

export type AdKit = {
  itens: AdItem[];
};
