export type Profile = 'creator' | 'affiliate' | 'local' | 'beginner' | 'niche';

export type ProjectData = {
  name: string;
  description: string;
  audience: string;
  offer: string;
  differentiators: string[];
  objections: string[];
  tone: string;
  channels: string[];
  niche?: string;
  constraints?: string[];
  proofs?: string[];
};

export type PromptDefinition = {
  version: string;
  system: string;
  guidelines: string[];
};

export type PromptPayload = {
  profile: Profile | 'base';
  prompt: PromptDefinition;
};

export type EngineKit = {
  posts: import('./schemas/post.schema').PostKit;
  stories: import('./schemas/story.schema').StoryKit;
  reels: import('./schemas/reel.schema').ReelKit;
  oferta: import('./schemas/offer.schema').OfferKit;
  dm: import('./schemas/dm.schema').DmKit;
  whatsapp: import('./schemas/dm.schema').WhatsappKit;
  ads: import('./schemas/ad.schema').AdKit;
  landing: import('./schemas/landing.schema').LandingKit;
};

export type AIRequest = {
  contentType:
    | 'posts'
    | 'stories'
    | 'reels'
    | 'oferta'
    | 'dm'
    | 'whatsapp'
    | 'ads'
    | 'landing';
  prompt: PromptDefinition;
  projectData: ProjectData;
  profile: Profile;
};

export type AIClient = {
  generateJSON: <T>(request: AIRequest) => Promise<T>;
};
