import type { GenerateJSONArgs, LLMClient, ProjectData, Profile, SchemaName, WithMeta } from './types';
import type { PostKit } from './schemas/post.schema';
import type { StoryKit } from './schemas/story.schema';
import type { ReelKit } from './schemas/reel.schema';
import type { OfferKit } from './schemas/offer.schema';
import type { DmKit, WhatsappKit } from './schemas/dm.schema';
import type { AdKit } from './schemas/ad.schema';
import type { LandingKit } from './schemas/landing.schema';

const buildHashtags = (projectData: ProjectData) => {
  const base = [
    '#marketingdigital',
    '#conteudocriativo',
    '#negocios',
    '#estrategia',
    '#resultadosreais',
  ];

  if (projectData.niche) {
    base.push(`#${projectData.niche.replace(/\s+/g, '').toLowerCase()}`);
  }

  return base.slice(0, 6);
};

const affiliateDisclaimer = (profile: Profile) =>
  profile === 'affiliate'
    ? 'Sem promessa de ganhos financeiros; resultados variam conforme esforço e contexto.'
    : '';

const buildPosts = (projectData: ProjectData, profile: Profile): PostKit => ({
  itens: [
    {
      id: 'post-1',
      objetivo: 'atrair',
      formato: 'carrossel',
      titulo: `3 motivos para ${projectData.audience} prestar atenção em ${projectData.name}`,
      legenda: `Se você é ${projectData.audience}, esses pontos vão ajudar a entender por que ${projectData.name} faz sentido agora. ${projectData.differentiators[0] ?? 'Foco em clareza e resultado real.'}`,
      cta: 'Comente “quero” para receber mais detalhes.',
      hashtags: buildHashtags(projectData),
    },
    {
      id: 'post-2',
      objetivo: 'engajar',
      formato: 'imagem',
      titulo: 'Dica rápida para aplicar hoje',
      legenda: `Uma ação simples: ${projectData.offer}. Isso ajuda a destravar o primeiro passo sem complicação.`,
      cta: 'Salve para lembrar depois.',
      hashtags: buildHashtags(projectData),
    },
    {
      id: 'post-3',
      objetivo: 'converter',
      formato: 'texto',
      titulo: 'Convite direto',
      legenda: `Se você quer ${projectData.description.toLowerCase()}, ${projectData.name} entrega um caminho prático. ${affiliateDisclaimer(profile)}`.trim(),
      cta: 'Me chame no direct para saber o próximo passo.',
      hashtags: buildHashtags(projectData),
    },
  ],
});

const buildStories = (projectData: ProjectData, profile: Profile): StoryKit => ({
  sequencias: [
    {
      id: 'story-1',
      objetivo: 'educar',
      titulo: 'Quebra de objeção',
      frames: [
        { ordem: 1, texto: `Talvez você pense: "${projectData.objections[0] ?? 'isso não é para mim'}."` },
        { ordem: 2, texto: `A verdade: ${projectData.name} foi pensado para ${projectData.audience}.` },
        { ordem: 3, texto: `O foco é ${projectData.offer}. ${affiliateDisclaimer(profile)}`.trim() },
      ],
      cta: 'Responda com sua maior dúvida.',
    },
    {
      id: 'story-2',
      objetivo: 'converter',
      titulo: 'Convite suave',
      frames: [
        { ordem: 1, texto: `Quer um passo a passo para ${projectData.description.toLowerCase()}?` },
        { ordem: 2, texto: `Eu preparo um resumo personalizado para ${projectData.audience}.` },
        { ordem: 3, texto: 'Se fizer sentido, te envio detalhes.' },
      ],
      cta: 'Me chama no direct.',
    },
  ],
});

const buildReels = (projectData: ProjectData, profile: Profile): ReelKit => ({
  itens: [
    {
      id: 'reel-1',
      gancho: `Você ainda não viu ${projectData.name} por esse ângulo`,
      roteiro: [
        'Apresente a dor principal em 5 segundos.',
        `Mostre como ${projectData.name} simplifica o caminho.`,
        `Destaque ${projectData.differentiators[0] ?? 'um diferencial prático'}.`,
      ],
      fechamento: `Resumo rápido e convite para conversar. ${affiliateDisclaimer(profile)}`.trim(),
      cta: 'Envie “quero” no direct.',
    },
    {
      id: 'reel-2',
      gancho: 'O erro mais comum que vejo',
      roteiro: [
        `Erro: ignorar ${projectData.offer}.`,
        'Mostre uma alternativa simples.',
        `Convide para conhecer ${projectData.name}.`,
      ],
      fechamento: 'Feche com empatia e clareza.',
      cta: 'Salve para aplicar depois.',
    },
  ],
});

const buildOffer = (projectData: ProjectData, profile: Profile): OfferKit => ({
  headline: `${projectData.name}: ${projectData.description}`,
  subheadline: `Feito para ${projectData.audience} que busca ${projectData.offer}.`,
  bullets: [
    projectData.differentiators[0] ?? 'Conteúdo direto ao ponto.',
    projectData.differentiators[1] ?? 'Aplicação prática no dia a dia.',
    projectData.differentiators[2] ?? 'Suporte com linguagem clara.',
  ],
  cta: 'Quero receber mais informações.',
  observacoes: [
    'Sem promessas exageradas, foco em aplicação real.',
    affiliateDisclaimer(profile),
  ].filter(Boolean),
});

const buildDm = (projectData: ProjectData, profile: Profile): DmKit => ({
  objetivo: `Conduzir ${projectData.audience} para a próxima etapa com clareza e respeito.`,
  etapas: [
    {
      ordem: 1,
      autor: 'marca',
      mensagem: `Oi! Vi seu interesse em ${projectData.name}. O que você está buscando hoje?`,
    },
    {
      ordem: 2,
      autor: 'cliente',
      mensagem: 'Quero entender se isso serve para mim.',
    },
    {
      ordem: 3,
      autor: 'marca',
      mensagem: `Perfeito. ${projectData.name} é indicado para ${projectData.audience}. ${affiliateDisclaimer(profile)}`.trim(),
    },
    {
      ordem: 4,
      autor: 'marca',
      mensagem: `Posso te enviar um resumo com ${projectData.offer}?`,
    },
  ],
});

const buildWhatsapp = (projectData: ProjectData, profile: Profile): WhatsappKit => ({
  objetivo: 'Follow-up com empatia e foco em esclarecimento.',
  etapas: [
    {
      ordem: 1,
      autor: 'marca',
      mensagem: `Oi! Ficou alguma dúvida sobre ${projectData.name}? Estou por aqui para ajudar.`,
    },
    {
      ordem: 2,
      autor: 'marca',
      mensagem: `Resumo rápido: ${projectData.description}. ${affiliateDisclaimer(profile)}`.trim(),
    },
    {
      ordem: 3,
      autor: 'marca',
      mensagem: 'Se fizer sentido, posso te enviar próximos passos.',
    },
  ],
});

const buildAds = (projectData: ProjectData, profile: Profile): AdKit => ({
  itens: [
    {
      id: 'ad-1',
      headline: `${projectData.name} para ${projectData.audience}`,
      texto: `Descubra como ${projectData.description.toLowerCase()} com foco em ${projectData.offer}. ${affiliateDisclaimer(profile)}`.trim(),
      cta: 'Saiba mais',
    },
    {
      id: 'ad-2',
      headline: 'Próximo passo com clareza',
      texto: `Conteúdo direto para quem busca ${projectData.offer} sem promessas irreais.`,
      cta: 'Quero detalhes',
    },
    {
      id: 'ad-3',
      headline: 'Comece com segurança',
      texto: `Uma alternativa prática para ${projectData.audience} que precisa de orientação.`,
      cta: 'Falar com especialista',
    },
  ],
});

const buildLanding = (projectData: ProjectData, profile: Profile): LandingKit => ({
  headline: `${projectData.name}`,
  subheadline: `${projectData.description} com foco em ${projectData.offer}.`,
  secoes: [
    {
      ordem: 1,
      titulo: 'Para quem é',
      conteudo: `Indicado para ${projectData.audience} que deseja ${projectData.offer}.`,
    },
    {
      ordem: 2,
      titulo: 'O que você encontra',
      conteudo: projectData.differentiators.join(', ') || 'Conteúdo prático e aplicável.',
    },
    {
      ordem: 3,
      titulo: 'Perguntas frequentes',
      conteudo: projectData.objections.join(' | ') || 'Envie sua dúvida para atendimento.',
    },
    {
      ordem: 4,
      titulo: 'Próximo passo',
      conteudo: `Se fizer sentido, peça mais informações. ${affiliateDisclaimer(profile)}`.trim(),
    },
  ],
  ctaPrincipal: 'Quero receber o plano completo',
});

export const createMockOpenAIClient = (): LLMClient => ({
  async generateJSON<T>(args: GenerateJSONArgs): Promise<T> {
    const context = args.context;

    if (!context) {
      throw new Error('Mock OpenAI client precisa do contexto para gerar conteúdo.');
    }

    const { contentType, projectData, profile } = context;

    const builders = {
      posts: () => buildPosts(projectData, profile),
      stories: () => buildStories(projectData, profile),
      reels: () => buildReels(projectData, profile),
      oferta: () => buildOffer(projectData, profile),
      dm: () => buildDm(projectData, profile),
      whatsapp: () => buildWhatsapp(projectData, profile),
      ads: () => buildAds(projectData, profile),
      landing: () => buildLanding(projectData, profile),
    } satisfies Record<SchemaName, () => unknown>;

    const output = builders[contentType]() as WithMeta<T>;

    return output;
  },
});
