import { ContentKitList } from '../../components/ContentKitList';
import { kitSummary, projects } from '../../../lib/mock';

type ProjectPageProps = {
  params: { id: string };
};

export default function ProjectDetailPage({ params }: ProjectPageProps) {
  const project = projects.find((item) => item.id === params.id) ?? projects[0];

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
