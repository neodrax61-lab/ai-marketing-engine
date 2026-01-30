import type { LLMClient, ProjectData, PromptDefinition, Profile, WithMeta } from '../types';
import type { AdKit } from '../schemas/ad.schema';
import { buildSystemPrompt, buildUserPrompt } from '../promptBuilder';

export const generateAds = async (
  projectData: ProjectData,
  profile: Profile,
  prompt: PromptDefinition,
  client: LLMClient,
): Promise<WithMeta<AdKit>> =>
  client.generateJSON<WithMeta<AdKit>>({
    system: buildSystemPrompt(prompt),
    user: buildUserPrompt('ads', projectData, profile),
    schemaName: 'ads',
    context: {
      contentType: 'ads',
      projectData,
      profile,
    },
  });
