import type { AIClient, ProjectData, PromptDefinition, Profile } from '../types';
import type { LandingKit } from '../schemas/landing.schema';

export const generateLanding = async (
  projectData: ProjectData,
  profile: Profile,
  prompt: PromptDefinition,
  client: AIClient,
): Promise<LandingKit> =>
  client.generateJSON<LandingKit>({
    contentType: 'landing',
    prompt,
    projectData,
    profile,
  });
