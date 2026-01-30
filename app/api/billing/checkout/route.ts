import { NextResponse } from 'next/server';
import { getDevUser } from '../../../../lib/db/getDevUser';
import { getOrCreateStripeCustomerId } from '../../../../lib/billing/customers';
import { getStripeClient } from '../../../../lib/billing/stripe';
import { getPriceIdForPlan, isBillingPlan } from '../../../../lib/billing/plans';

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as { plan?: string };

    if (!payload?.plan || !isBillingPlan(payload.plan)) {
      return NextResponse.json({ error: 'Plano inválido.' }, { status: 400 });
    }

    const user = await getDevUser();
    const stripeCustomerId = await getOrCreateStripeCustomerId(user);
    const priceId = getPriceIdForPlan(payload.plan);
    const stripe = getStripeClient();
    const origin = request.headers.get('origin') ?? new URL(request.url).origin;

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      customer: stripeCustomerId,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${origin}/billing?status=success`,
      cancel_url: `${origin}/billing?status=cancel`,
      metadata: {
        userId: user.id,
        plan: payload.plan,
      },
    });

    if (!session.url) {
      return NextResponse.json({ error: 'Checkout indisponível.' }, { status: 500 });
    }

    return NextResponse.json({ checkoutUrl: session.url });
  } catch (error) {
    console.error('Erro ao iniciar checkout:', error);
    return NextResponse.json(
      { error: 'Não foi possível iniciar o checkout agora.' },
      { status: 500 },
    );
  }
}
