import type { ProjectData, PromptDefinition, Profile, SchemaName } from './types';

const formatGuidelines = (guidelines: string[]) =>
  guidelines.length ? `Diretrizes:\n- ${guidelines.join('\n- ')}` : '';

export const buildSystemPrompt = (prompt: PromptDefinition): string =>
  [prompt.system, formatGuidelines(prompt.guidelines)].filter(Boolean).join('\n\n');

export const buildUserPrompt = (
  contentType: SchemaName,
  projectData: ProjectData,
  profile: Profile,
): string =>
  [
    `Tipo de conteúdo: ${contentType}.`,
    `Perfil: ${profile}.`,
    'Dados do projeto (JSON):',
    JSON.stringify(projectData),
    'Gere o conteúdo seguindo as diretrizes acima.',
  ].join('\n');
