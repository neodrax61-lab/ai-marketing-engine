import type { AIClient, ProjectData, PromptDefinition, Profile } from '../types';
import type { OfferKit } from '../schemas/offer.schema';

export const generateOffer = async (
  projectData: ProjectData,
  profile: Profile,
  prompt: PromptDefinition,
  client: AIClient,
): Promise<OfferKit> =>
  client.generateJSON<OfferKit>({
    contentType: 'oferta',
    prompt,
    projectData,
    profile,
  });
