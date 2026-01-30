import type { LLMClient, ProjectData, PromptDefinition, Profile, WithMeta } from '../types';
import type { StoryKit } from '../schemas/story.schema';
import { buildSystemPrompt, buildUserPrompt } from '../promptBuilder';

export const generateStories = async (
  projectData: ProjectData,
  profile: Profile,
  prompt: PromptDefinition,
  client: LLMClient,
): Promise<WithMeta<StoryKit>> =>
  client.generateJSON<WithMeta<StoryKit>>({
    system: buildSystemPrompt(prompt),
    user: buildUserPrompt('stories', projectData, profile),
    schemaName: 'stories',
    context: {
      contentType: 'stories',
      projectData,
      profile,
    },
  });
