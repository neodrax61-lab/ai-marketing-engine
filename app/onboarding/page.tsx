import { onboardingSteps } from '../../lib/mock';

export default function OnboardingPage() {
  return (
    <section className="two-col">
      <div className="card">
        <h2>Onboarding obrigatório</h2>
        <p>
          Preencha os dados essenciais para gerar um kit completo, sem necessidade de atendimento
          manual.
        </p>
        <ol>
          {onboardingSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </div>
      <div className="card">
        <h3>Dados solicitados</h3>
        <ul>
          <li>Perfil (Criador, Afiliado, Negócio Local, Iniciante ou Nicho específico).</li>
          <li>Nome e descrição do produto/serviço.</li>
          <li>Público-alvo, diferenciais e objeções comuns.</li>
          <li>Tom de voz e canais desejados (Instagram, WhatsApp, anúncios).</li>
        </ul>
        <button type="button">Iniciar onboarding</button>
      </div>
    </section>
  );
}
