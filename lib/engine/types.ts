export type Profile = 'creator' | 'affiliate' | 'local' | 'beginner' | 'niche';

export type EngineMeta = {
  totalTokens: number | null;
  totalCostEstimate: number | null;
  model: string | null;
};

export type WithMeta<T> = T & { meta?: EngineMeta };

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
  posts: WithMeta<import('./schemas/post.schema').PostKit>;
  stories: WithMeta<import('./schemas/story.schema').StoryKit>;
  reels: WithMeta<import('./schemas/reel.schema').ReelKit>;
  oferta: WithMeta<import('./schemas/offer.schema').OfferKit>;
  dm: WithMeta<import('./schemas/dm.schema').DmKit>;
  whatsapp: WithMeta<import('./schemas/dm.schema').WhatsappKit>;
  ads: WithMeta<import('./schemas/ad.schema').AdKit>;
  landing: WithMeta<import('./schemas/landing.schema').LandingKit>;
};

export type SchemaName =
  | 'posts'
  | 'stories'
  | 'reels'
  | 'oferta'
  | 'dm'
  | 'whatsapp'
  | 'ads'
  | 'landing';

export type JSONSchema = Record<string, unknown>;

export type GenerateJSONArgs = {
  system: string;
  user: string;
  schemaName?: SchemaName;
  schema?: JSONSchema;
  temperature?: number;
  maxTokens?: number;
  context?: {
    contentType: SchemaName;
    projectData: ProjectData;
    profile: Profile;
  };
};

export interface LLMClient {
  generateJSON: <T>(args: GenerateJSONArgs) => Promise<T>;
}
