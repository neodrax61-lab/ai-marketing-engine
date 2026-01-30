export type DmStep = {
  ordem: number;
  autor: 'marca' | 'cliente';
  mensagem: string;
};

export type DmKit = {
  etapas: DmStep[];
  objetivo: string;
};

export type WhatsappKit = {
  etapas: DmStep[];
  objetivo: string;
};
