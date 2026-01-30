export type PostItem = {
  id: string;
  objetivo: 'atrair' | 'engajar' | 'converter';
  formato: 'imagem' | 'carrossel' | 'texto';
  titulo: string;
  legenda: string;
  cta: string;
  hashtags: string[];
};

export type PostKit = {
  itens: PostItem[];
};
