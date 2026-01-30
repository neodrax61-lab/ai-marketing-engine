import type { LLMClient, ProjectData, PromptDefinition, Profile, WithMeta } from '../types';
import type { ReelKit } from '../schemas/reel.schema';
import { buildSystemPrompt, buildUserPrompt } from '../promptBuilder';

export const generateReels = async (
  projectData: ProjectData,
  profile: Profile,
  prompt: PromptDefinition,
  client: LLMClient,
): Promise<WithMeta<ReelKit>> =>
  client.generateJSON<WithMeta<ReelKit>>({
    system: buildSystemPrompt(prompt),
    user: buildUserPrompt('reels', projectData, profile),
    schemaName: 'reels',
    context: {
      contentType: 'reels',
      projectData,
      profile,
    },
  });
