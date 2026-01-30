import { promptVersions } from '../../lib/mock';

export default function AdminPage() {
  return (
    <section>
      <h2>Admin de prompts</h2>
      <p>
        Gerencie templates, versionamento e ativação dos prompts usados pela engine de geração.
      </p>
      <div className="card">
        <h3>Métricas rápidas</h3>
        <ul>
          <li>Usuários ativos: 128</li>
          <li>Gerações no mês: 642</li>
          <li>Custo estimado OpenAI: R$ 890,00</li>
        </ul>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Versão</th>
            <th>Perfil</th>
            <th>Status</th>
            <th>Atualizado em</th>
          </tr>
        </thead>
        <tbody>
          {promptVersions.map((version) => (
            <tr key={version.id}>
              <td>{version.id}</td>
              <td>{version.profile}</td>
              <td>{version.status}</td>
              <td>{version.updatedAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
