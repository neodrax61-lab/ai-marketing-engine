'use client';

import { useState } from 'react';

type BillingPlan = 'basic' | 'pro' | 'business';

const planLabels: Record<BillingPlan, string> = {
  basic: 'Assinar Basic',
  pro: 'Assinar Pro',
  business: 'Assinar Business',
};

export default function BillingPage() {
  const [loadingPlan, setLoadingPlan] = useState<BillingPlan | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async (plan: BillingPlan) => {
    setLoadingPlan(plan);
    setError(null);

    try {
      const response = await fetch('/api/billing/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan }),
      });

      const data = (await response.json()) as { checkoutUrl?: string; error?: string };

      if (!response.ok) {
        throw new Error(data.error ?? 'Não foi possível iniciar o checkout.');
      }

      if (!data.checkoutUrl) {
        throw new Error('Checkout indisponível.');
      }

      window.location.href = data.checkoutUrl;
    } catch (checkoutError) {
      setError(
        checkoutError instanceof Error
          ? checkoutError.message
          : 'Não foi possível iniciar o checkout.',
      );
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <section className="card">
      <h2>Escolha seu plano</h2>
      <p>Assinaturas mensais com acesso total à geração de conteúdo.</p>
      <div className="stack">
        {(Object.keys(planLabels) as BillingPlan[]).map((plan) => (
          <button
            key={plan}
            type="button"
            onClick={() => handleCheckout(plan)}
            disabled={loadingPlan === plan}
          >
            {loadingPlan === plan ? 'Redirecionando...' : planLabels[plan]}
          </button>
        ))}
      </div>
      {error ? <p role="alert">{error}</p> : null}
    </section>
  );
}
