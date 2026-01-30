import { ContentKitList } from '../../components/ContentKitList';
import { GenerateContentSection } from './GenerateContentSection';
import { kitSummary, projects } from '../../../lib/mock';
import type { Profile, ProjectData } from '../../../lib/engine/types';

const profileMap: Record<string, Profile> = {
  'Criador de Conteúdo': 'creator',
  'Negócio Local': 'local',
  Afiliado: 'affiliate',
};

type ProjectPageProps = {
  params: { id: string };
};

export default function ProjectDetailPage({ params }: ProjectPageProps) {
  const project = projects.find((item) => item.id === params.id) ?? projects[0];
  const profile = profileMap[project.profile] ?? 'creator';

  const projectData: ProjectData = {
    name: project.name,
    description: 'Programa digital focado em gerar resultados rápidos e sustentáveis.',
    audience: 'Mulheres de 25-40 anos que buscam praticidade e resultados confiáveis.',
    offer: 'Acesso imediato ao curso completo + bônus de cardápios semanais e suporte.',
    differentiators: [
      'Receitas simples e rápidas de executar',
      'Suporte semanal com feedback personalizado',
      'Método testado com centenas de alunas',
    ],
    objections: [
      'Não tenho tempo para cozinhar todos os dias',
      'Tenho medo de não conseguir manter a rotina',
      'Já tentei outras dietas sem sucesso',
    ],
    tone: 'Amigável, direto e motivador, com linguagem clara e acolhedora.',
    channels: ['Instagram', 'Stories', 'Reels', 'WhatsApp', 'Anúncios Meta'],
    niche: 'Alimentação saudável e praticidade',
    constraints: ['Sem promessas exageradas', 'Evitar termos técnicos complexos'],
    proofs: ['Mais de 2.000 alunas ativas', 'Depoimentos semanais de resultados reais'],
  };

  return (
    <section className="two-col">
      <div>
        <h2>{project.name}</h2>
        <p className="pill">{project.profile}</p>
        <p>
          Status atual: <strong>{project.status}</strong>
        </p>
        <div className="card">
          <h3>Briefing do projeto</h3>
          <ul>
            <li>Produto: {project.name}</li>
            <li>Público-alvo: Mulheres 25-40 que querem praticidade.</li>
            <li>Diferenciais: Método simples + acompanhamento semanal.</li>
            <li>Tom de voz: Amigável e direto.</li>
            <li>Canais: Instagram, WhatsApp e anúncios.</li>
          </ul>
        </div>
        <GenerateContentSection projectData={projectData} profile={profile} />
        <div className="card">
          <h3>Editar ou regenerar</h3>
          <p>
            O usuário pode editar conteúdos individualmente, regenerar itens específicos e manter o
            histórico de versões com rastreio de tokens e custo estimado.
          </p>
          <button type="button">Editar conteúdo</button>
          <button type="button">Regenerar anúncio</button>
        </div>
      </div>
      <div>
        <ContentKitList items={kitSummary} />
        <div className="card">
          <h3>Exportação</h3>
          <p>Baixe o kit em PDF ou posts em CSV para planejar campanhas.</p>
          <button type="button">Exportar PDF</button>
          <button type="button">Exportar CSV</button>
        </div>
      </div>
    </section>
  );
}
