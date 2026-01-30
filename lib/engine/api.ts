import type { EngineKit, Profile, ProjectData } from './types';

export type GenerateRequest = {
  projectData: ProjectData;
  profile: Profile;
};

export type GenerateSuccessResponse = {
  kit: EngineKit;
};

export type GenerateErrorResponse = {
  error: string;
};

export type GenerateResponse = GenerateSuccessResponse | GenerateErrorResponse;
