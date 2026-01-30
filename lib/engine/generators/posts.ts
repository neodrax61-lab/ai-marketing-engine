import type { LLMClient, ProjectData, PromptDefinition, Profile, WithMeta } from '../types';
import type { PostKit } from '../schemas/post.schema';
import { buildSystemPrompt, buildUserPrompt } from '../promptBuilder';

export const generatePosts = async (
  projectData: ProjectData,
  profile: Profile,
  prompt: PromptDefinition,
  client: LLMClient,
): Promise<WithMeta<PostKit>> =>
  client.generateJSON<WithMeta<PostKit>>({
    system: buildSystemPrompt(prompt),
    user: buildUserPrompt('posts', projectData, profile),
    schemaName: 'posts',
    context: {
      contentType: 'posts',
      projectData,
      profile,
    },
  });
