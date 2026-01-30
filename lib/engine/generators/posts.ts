import type { AIClient, ProjectData, PromptDefinition, Profile } from '../types';
import type { PostKit } from '../schemas/post.schema';

export const generatePosts = async (
  projectData: ProjectData,
  profile: Profile,
  prompt: PromptDefinition,
  client: AIClient,
): Promise<PostKit> =>
  client.generateJSON<PostKit>({
    contentType: 'posts',
    prompt,
    projectData,
    profile,
  });
