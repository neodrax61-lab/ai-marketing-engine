import { ContentKitList } from './components/ContentKitList';
import { kitSummary } from '../lib/mock';

export default function HomePage() {
  return (
    <div className="two-col">
      <section>
        <h2>Crie projetos que viram vendas automaticamente.</h2>
        <p>
          O Motor de Produtos Digitais com IA transforma dados do seu produto em um kit completo
          de conteúdo e vendas. Sem atendimento manual, com histórico, edição, regeneração e
          exportação em poucos cliques.
        </p>
        <div className="card-grid">
          <div className="card">
            <p className="badge">Assinatura recorrente</p>
            <h3>Planos flexíveis com limites inteligentes.</h3>
            <p>
              Integração com Stripe, cobranças mensais ou anuais e bloqueio automático quando o
              limite de gerações é atingido.
            </p>
          </div>
          <div className="card">
            <p className="badge">Engine IA</p>
            <h3>Prompts dinâmicos e versionados.</h3>
            <p>
              Um núcleo de geração que respeita o perfil escolhido, retorna JSON estruturado e
              salva tokens, custos e histórico.
            </p>
          </div>
          <div className="card">
            <p className="badge">Conteúdo responsável</p>
            <h3>Conversão sem promessas ilegais.</h3>
            <p>
              O conteúdo é gerado em pt-BR, evita provas falsas e se adapta ao canal escolhido.
            </p>
          </div>
        </div>
      </section>
      <ContentKitList items={kitSummary} />
    </div>
  );
}
