import type { PromptDefinition } from '../types';

export const beginnerPrompt: PromptDefinition = {
  version: 'v1.0-beginner',
  system:
    'Perfil: Iniciante. Foco em clareza, simplicidade e próximos passos.',
  guidelines: [
    'Explicar conceitos sem jargões.',
    'Destacar pequenos passos e progresso gradual.',
  ],
};
