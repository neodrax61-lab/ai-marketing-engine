import { basePrompt } from './prompts/base';
import { creatorPrompt } from './prompts/creator';
import { affiliatePrompt } from './prompts/affiliate';
import { localPrompt } from './prompts/local';
import { beginnerPrompt } from './prompts/beginner';
import { nichePrompt } from './prompts/niche';
import { createMockOpenAIClient } from './mockOpenAI';
import { generatePosts } from './generators/posts';
import { generateStories } from './generators/stories';
import { generateReels } from './generators/reels';
import { generateOffer } from './generators/offer';
import { generateDm } from './generators/dm';
import { generateWhatsapp } from './generators/whatsapp';
import { generateAds } from './generators/ads';
import { generateLanding } from './generators/landing';
import type { EngineKit, Profile, ProjectData, PromptDefinition } from './types';

const profilePromptMap: Record<Profile, PromptDefinition> = {
  creator: creatorPrompt,
  affiliate: affiliatePrompt,
  local: localPrompt,
  beginner: beginnerPrompt,
  niche: nichePrompt,
};

const mergePrompts = (base: PromptDefinition, specific: PromptDefinition): PromptDefinition => ({
  version: `${base.version}+${specific.version}`,
  system: `${base.system} ${specific.system}`,
  guidelines: [...base.guidelines, ...specific.guidelines],
});

export const generateKit = async (
  projectData: ProjectData,
  profile: Profile,
): Promise<EngineKit> => {
  const prompt = mergePrompts(basePrompt, profilePromptMap[profile]);
  const client = createMockOpenAIClient();

  const [posts, stories, reels, oferta, dm, whatsapp, ads, landing] =
    await Promise.all([
      generatePosts(projectData, profile, prompt, client),
      generateStories(projectData, profile, prompt, client),
      generateReels(projectData, profile, prompt, client),
      generateOffer(projectData, profile, prompt, client),
      generateDm(projectData, profile, prompt, client),
      generateWhatsapp(projectData, profile, prompt, client),
      generateAds(projectData, profile, prompt, client),
      generateLanding(projectData, profile, prompt, client),
    ]);

  return {
    posts,
    stories,
    reels,
    oferta,
    dm,
    whatsapp,
    ads,
    landing,
  };
};
