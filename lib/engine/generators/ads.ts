import type { AIClient, ProjectData, PromptDefinition, Profile } from '../types';
import type { AdKit } from '../schemas/ad.schema';

export const generateAds = async (
  projectData: ProjectData,
  profile: Profile,
  prompt: PromptDefinition,
  client: AIClient,
): Promise<AdKit> =>
  client.generateJSON<AdKit>({
    contentType: 'ads',
    prompt,
    projectData,
    profile,
  });
