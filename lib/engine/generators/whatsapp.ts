import type { LLMClient, ProjectData, PromptDefinition, Profile, WithMeta } from '../types';
import type { WhatsappKit } from '../schemas/dm.schema';
import { buildSystemPrompt, buildUserPrompt } from '../promptBuilder';

export const generateWhatsapp = async (
  projectData: ProjectData,
  profile: Profile,
  prompt: PromptDefinition,
  client: LLMClient,
): Promise<WithMeta<WhatsappKit>> =>
  client.generateJSON<WithMeta<WhatsappKit>>({
    system: buildSystemPrompt(prompt),
    user: buildUserPrompt('whatsapp', projectData, profile),
    schemaName: 'whatsapp',
    context: {
      contentType: 'whatsapp',
      projectData,
      profile,
    },
  });
