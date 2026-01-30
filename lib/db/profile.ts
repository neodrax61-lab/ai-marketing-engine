import type { Profile } from '../engine/types';

export const projectProfiles = ['criador', 'afiliado', 'local', 'iniciante', 'nicho'] as const;

export type ProjectProfile = (typeof projectProfiles)[number];

export const profileToEngine: Record<ProjectProfile, Profile> = {
  criador: 'creator',
  afiliado: 'affiliate',
  local: 'local',
  iniciante: 'beginner',
  nicho: 'niche',
};

export const profileLabels: Record<ProjectProfile, string> = {
  criador: 'Criador de Conteúdo',
  afiliado: 'Afiliado',
  local: 'Negócio Local',
  iniciante: 'Iniciante',
  nicho: 'Nicho',
};

export const isProjectProfile = (value: unknown): value is ProjectProfile =>
  projectProfiles.includes(value as ProjectProfile);
