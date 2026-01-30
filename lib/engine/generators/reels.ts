import type { AIClient, ProjectData, PromptDefinition, Profile } from '../types';
import type { ReelKit } from '../schemas/reel.schema';

export const generateReels = async (
  projectData: ProjectData,
  profile: Profile,
  prompt: PromptDefinition,
  client: AIClient,
): Promise<ReelKit> =>
  client.generateJSON<ReelKit>({
    contentType: 'reels',
    prompt,
    projectData,
    profile,
  });
