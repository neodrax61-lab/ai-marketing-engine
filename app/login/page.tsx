export default function LoginPage() {
  return (
    <section className="two-col">
      <div className="card">
        <h2>Login seguro</h2>
        <p>Entre com email usando magic link ou senha.</p>
        <ul>
          <li>Cadastro automático após confirmação de pagamento.</li>
          <li>Rotas protegidas e sessão persistente.</li>
          <li>Recuperação rápida em caso de troca de dispositivo.</li>
        </ul>
      </div>
      <div className="card">
        <h3>Prévia do fluxo</h3>
        <ol>
          <li>Usuário faz checkout no Stripe.</li>
          <li>Webhook cria a conta e dispara o onboarding.</li>
          <li>Magic link enviado por email em até 2 minutos.</li>
        </ol>
        <button type="button">Enviar magic link</button>
      </div>
    </section>
  );
}
