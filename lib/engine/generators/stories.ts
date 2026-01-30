import type { AIClient, ProjectData, PromptDefinition, Profile } from '../types';
import type { StoryKit } from '../schemas/story.schema';

export const generateStories = async (
  projectData: ProjectData,
  profile: Profile,
  prompt: PromptDefinition,
  client: AIClient,
): Promise<StoryKit> =>
  client.generateJSON<StoryKit>({
    contentType: 'stories',
    prompt,
    projectData,
    profile,
  });
