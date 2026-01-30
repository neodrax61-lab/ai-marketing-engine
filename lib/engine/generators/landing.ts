import type { LLMClient, ProjectData, PromptDefinition, Profile, WithMeta } from '../types';
import type { LandingKit } from '../schemas/landing.schema';
import { buildSystemPrompt, buildUserPrompt } from '../promptBuilder';

export const generateLanding = async (
  projectData: ProjectData,
  profile: Profile,
  prompt: PromptDefinition,
  client: LLMClient,
): Promise<WithMeta<LandingKit>> =>
  client.generateJSON<WithMeta<LandingKit>>({
    system: buildSystemPrompt(prompt),
    user: buildUserPrompt('landing', projectData, profile),
    schemaName: 'landing',
    context: {
      contentType: 'landing',
      projectData,
      profile,
    },
  });
