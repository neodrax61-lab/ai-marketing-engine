export type LandingSection = {
  ordem: number;
  titulo: string;
  conteudo: string;
};

export type LandingKit = {
  headline: string;
  subheadline: string;
  secoes: LandingSection[];
  ctaPrincipal: string;
};
