import { StatCard } from '../components/StatCard';
import { planStatus, projects } from '../../lib/mock';

export default function DashboardPage() {
  return (
    <section>
      <h2>Dashboard</h2>
      <div className="card-grid">
        <StatCard label="Plano ativo" value={planStatus.plan} helper={`Renova em ${planStatus.renewsAt}`} />
        <StatCard
          label="Gerações"
          value={`${planStatus.creditsUsed}/${planStatus.creditsLimit}`}
          helper="Bloqueio automático ao atingir o limite."
        />
        <StatCard label="Projetos" value={`${projects.length}`} helper="Gerencie múltiplos nichos." />
      </div>
      <h3 className="section-title">Últimos projetos</h3>
      <div className="card-grid">
        {projects.map((project) => (
          <div key={project.id} className="card">
            <p className="badge">{project.profile}</p>
            <h3>{project.name}</h3>
            <p>{project.status}</p>
            <a href={`/projects/${project.id}`}>Abrir projeto →</a>
          </div>
        ))}
      </div>
    </section>
  );
}
