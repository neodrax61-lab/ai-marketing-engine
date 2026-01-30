import type { LLMClient, ProjectData, PromptDefinition, Profile, WithMeta } from '../types';
import type { DmKit } from '../schemas/dm.schema';
import { buildSystemPrompt, buildUserPrompt } from '../promptBuilder';

export const generateDm = async (
  projectData: ProjectData,
  profile: Profile,
  prompt: PromptDefinition,
  client: LLMClient,
): Promise<WithMeta<DmKit>> =>
  client.generateJSON<WithMeta<DmKit>>({
    system: buildSystemPrompt(prompt),
    user: buildUserPrompt('dm', projectData, profile),
    schemaName: 'dm',
    context: {
      contentType: 'dm',
      projectData,
      profile,
    },
  });
