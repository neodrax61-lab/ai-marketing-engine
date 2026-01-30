import { ProjectCard } from '../components/ProjectCard';
import { projects } from '../../lib/mock';

export default function ProjectsPage() {
  return (
    <section>
      <div className="two-col">
        <div>
          <h2>Projetos</h2>
          <p>
            Cada projeto armazena o briefing completo, gerações com IA e histórico de versões para
            edição e regeneração rápida.
          </p>
        </div>
        <div className="card">
          <p className="badge">Novo projeto</p>
          <h3>Crie um kit completo agora.</h3>
          <p>Use o onboarding para capturar dados e disparar a engine de geração.</p>
          <button type="button">Criar projeto</button>
        </div>
      </div>
      <div className="card-grid">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            name={project.name}
            profile={project.profile}
            status={project.status}
            updatedAt={project.updatedAt}
            actions={<a href={`/projects/${project.id}`}>Ver detalhes →</a>}
          />
        ))}
      </div>
    </section>
  );
}
