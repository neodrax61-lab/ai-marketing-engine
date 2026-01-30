export type ReelItem = {
  id: string;
  gancho: string;
  roteiro: string[];
  fechamento: string;
  cta: string;
};

export type ReelKit = {
  itens: ReelItem[];
};
