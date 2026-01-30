import type { LLMClient, ProjectData, PromptDefinition, Profile, WithMeta } from '../types';
import type { OfferKit } from '../schemas/offer.schema';
import { buildSystemPrompt, buildUserPrompt } from '../promptBuilder';

export const generateOffer = async (
  projectData: ProjectData,
  profile: Profile,
  prompt: PromptDefinition,
  client: LLMClient,
): Promise<WithMeta<OfferKit>> =>
  client.generateJSON<WithMeta<OfferKit>>({
    system: buildSystemPrompt(prompt),
    user: buildUserPrompt('oferta', projectData, profile),
    schemaName: 'oferta',
    context: {
      contentType: 'oferta',
      projectData,
      profile,
    },
  });
