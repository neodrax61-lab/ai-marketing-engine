import type { JSONSchema, SchemaName } from '../types';

const postSchema: JSONSchema = {
  type: 'object',
  additionalProperties: false,
  required: ['itens'],
  properties: {
    itens: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['id', 'objetivo', 'formato', 'titulo', 'legenda', 'cta', 'hashtags'],
        properties: {
          id: { type: 'string' },
          objetivo: { type: 'string', enum: ['atrair', 'engajar', 'converter'] },
          formato: { type: 'string', enum: ['imagem', 'carrossel', 'texto'] },
          titulo: { type: 'string' },
          legenda: { type: 'string' },
          cta: { type: 'string' },
          hashtags: { type: 'array', items: { type: 'string' } },
        },
      },
    },
  },
};

const storySchema: JSONSchema = {
  type: 'object',
  additionalProperties: false,
  required: ['sequencias'],
  properties: {
    sequencias: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['id', 'objetivo', 'titulo', 'frames', 'cta'],
        properties: {
          id: { type: 'string' },
          objetivo: { type: 'string', enum: ['educar', 'relacionar', 'converter'] },
          titulo: { type: 'string' },
          frames: {
            type: 'array',
            items: {
              type: 'object',
              additionalProperties: false,
              required: ['ordem', 'texto'],
              properties: {
                ordem: { type: 'number' },
                texto: { type: 'string' },
              },
            },
          },
          cta: { type: 'string' },
        },
      },
    },
  },
};

const reelSchema: JSONSchema = {
  type: 'object',
  additionalProperties: false,
  required: ['itens'],
  properties: {
    itens: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['id', 'gancho', 'roteiro', 'fechamento', 'cta'],
        properties: {
          id: { type: 'string' },
          gancho: { type: 'string' },
          roteiro: { type: 'array', items: { type: 'string' } },
          fechamento: { type: 'string' },
          cta: { type: 'string' },
        },
      },
    },
  },
};

const offerSchema: JSONSchema = {
  type: 'object',
  additionalProperties: false,
  required: ['headline', 'subheadline', 'bullets', 'cta', 'observacoes'],
  properties: {
    headline: { type: 'string' },
    subheadline: { type: 'string' },
    bullets: { type: 'array', items: { type: 'string' } },
    garantia: { type: 'string' },
    cta: { type: 'string' },
    observacoes: { type: 'array', items: { type: 'string' } },
  },
};

const dmSchema: JSONSchema = {
  type: 'object',
  additionalProperties: false,
  required: ['objetivo', 'etapas'],
  properties: {
    objetivo: { type: 'string' },
    etapas: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['ordem', 'autor', 'mensagem'],
        properties: {
          ordem: { type: 'number' },
          autor: { type: 'string', enum: ['marca', 'cliente'] },
          mensagem: { type: 'string' },
        },
      },
    },
  },
};

const whatsappSchema: JSONSchema = dmSchema;

const adSchema: JSONSchema = {
  type: 'object',
  additionalProperties: false,
  required: ['itens'],
  properties: {
    itens: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['id', 'headline', 'texto', 'cta'],
        properties: {
          id: { type: 'string' },
          headline: { type: 'string' },
          texto: { type: 'string' },
          cta: { type: 'string' },
        },
      },
    },
  },
};

const landingSchema: JSONSchema = {
  type: 'object',
  additionalProperties: false,
  required: ['headline', 'subheadline', 'secoes', 'ctaPrincipal'],
  properties: {
    headline: { type: 'string' },
    subheadline: { type: 'string' },
    secoes: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['ordem', 'titulo', 'conteudo'],
        properties: {
          ordem: { type: 'number' },
          titulo: { type: 'string' },
          conteudo: { type: 'string' },
        },
      },
    },
    ctaPrincipal: { type: 'string' },
  },
};

export const responseSchemas: Record<SchemaName, JSONSchema> = {
  posts: postSchema,
  stories: storySchema,
  reels: reelSchema,
  oferta: offerSchema,
  dm: dmSchema,
  whatsapp: whatsappSchema,
  ads: adSchema,
  landing: landingSchema,
};

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const isString = (value: unknown): value is string => typeof value === 'string';

const isNumber = (value: unknown): value is number => typeof value === 'number' && Number.isFinite(value);

const isStringArray = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every(isString);

const validatePosts = (data: unknown): data is { itens: unknown[] } =>
  isObject(data) &&
  Array.isArray(data.itens) &&
  data.itens.every(
    (item) =>
      isObject(item) &&
      isString(item.id) &&
      ['atrair', 'engajar', 'converter'].includes(item.objetivo as string) &&
      ['imagem', 'carrossel', 'texto'].includes(item.formato as string) &&
      isString(item.titulo) &&
      isString(item.legenda) &&
      isString(item.cta) &&
      isStringArray(item.hashtags),
  );

const validateStories = (data: unknown): data is { sequencias: unknown[] } =>
  isObject(data) &&
  Array.isArray(data.sequencias) &&
  data.sequencias.every(
    (seq) =>
      isObject(seq) &&
      isString(seq.id) &&
      ['educar', 'relacionar', 'converter'].includes(seq.objetivo as string) &&
      isString(seq.titulo) &&
      Array.isArray(seq.frames) &&
      seq.frames.every(
        (frame) => isObject(frame) && isNumber(frame.ordem) && isString(frame.texto),
      ) &&
      isString(seq.cta),
  );

const validateReels = (data: unknown): data is { itens: unknown[] } =>
  isObject(data) &&
  Array.isArray(data.itens) &&
  data.itens.every(
    (item) =>
      isObject(item) &&
      isString(item.id) &&
      isString(item.gancho) &&
      isStringArray(item.roteiro) &&
      isString(item.fechamento) &&
      isString(item.cta),
  );

const validateOffer = (data: unknown): data is Record<string, unknown> =>
  isObject(data) &&
  isString(data.headline) &&
  isString(data.subheadline) &&
  isStringArray(data.bullets) &&
  (data.garantia === undefined || isString(data.garantia)) &&
  isString(data.cta) &&
  isStringArray(data.observacoes);

const validateDm = (data: unknown): data is Record<string, unknown> =>
  isObject(data) &&
  isString(data.objetivo) &&
  Array.isArray(data.etapas) &&
  data.etapas.every(
    (step) =>
      isObject(step) &&
      isNumber(step.ordem) &&
      ['marca', 'cliente'].includes(step.autor as string) &&
      isString(step.mensagem),
  );

const validateAds = (data: unknown): data is { itens: unknown[] } =>
  isObject(data) &&
  Array.isArray(data.itens) &&
  data.itens.every(
    (item) =>
      isObject(item) &&
      isString(item.id) &&
      isString(item.headline) &&
      isString(item.texto) &&
      isString(item.cta),
  );

const validateLanding = (data: unknown): data is Record<string, unknown> =>
  isObject(data) &&
  isString(data.headline) &&
  isString(data.subheadline) &&
  Array.isArray(data.secoes) &&
  data.secoes.every(
    (section) =>
      isObject(section) &&
      isNumber(section.ordem) &&
      isString(section.titulo) &&
      isString(section.conteudo),
  ) &&
  isString(data.ctaPrincipal);

export const validateResponse = (schemaName: SchemaName, data: unknown): boolean => {
  switch (schemaName) {
    case 'posts':
      return validatePosts(data);
    case 'stories':
      return validateStories(data);
    case 'reels':
      return validateReels(data);
    case 'oferta':
      return validateOffer(data);
    case 'dm':
    case 'whatsapp':
      return validateDm(data);
    case 'ads':
      return validateAds(data);
    case 'landing':
      return validateLanding(data);
    default:
      return false;
  }
};
