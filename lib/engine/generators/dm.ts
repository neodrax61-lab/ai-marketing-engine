import type { AIClient, ProjectData, PromptDefinition, Profile } from '../types';
import type { DmKit } from '../schemas/dm.schema';

export const generateDm = async (
  projectData: ProjectData,
  profile: Profile,
  prompt: PromptDefinition,
  client: AIClient,
): Promise<DmKit> =>
  client.generateJSON<DmKit>({
    contentType: 'dm',
    prompt,
    projectData,
    profile,
  });
