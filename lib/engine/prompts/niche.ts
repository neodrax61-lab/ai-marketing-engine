import type { PromptDefinition } from '../types';

export const nichePrompt: PromptDefinition = {
  version: 'v1.0-niche',
  system:
    'Perfil: Nicho específico. Foco em linguagem especializada e dores do segmento.',
  guidelines: [
    'Usar termos do nicho apenas se fornecidos.',
    'Conectar benefícios a desafios reais do segmento.',
  ],
};
