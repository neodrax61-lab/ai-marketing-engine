import type { AIClient, ProjectData, PromptDefinition, Profile } from '../types';
import type { WhatsappKit } from '../schemas/dm.schema';

export const generateWhatsapp = async (
  projectData: ProjectData,
  profile: Profile,
  prompt: PromptDefinition,
  client: AIClient,
): Promise<WhatsappKit> =>
  client.generateJSON<WhatsappKit>({
    contentType: 'whatsapp',
    prompt,
    projectData,
    profile,
  });
