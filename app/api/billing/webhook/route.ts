import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import type Stripe from 'stripe';
import { prisma } from '../../../../lib/db/prisma';
import { getStripeClient } from '../../../../lib/billing/stripe';
import { getPlanFromPriceId } from '../../../../lib/billing/plans';

const mapSubscriptionStatus = (status: Stripe.Subscription.Status) => {
  if (status === 'active' || status === 'trialing') {
    return 'active';
  }

  if (status === 'canceled' || status === 'incomplete_expired') {
    return 'canceled';
  }

  return 'inactive';
};

const DEFAULT_PLAN = 'basic' as const;

const ensureCustomerLinkedToUser = async (session: Stripe.Checkout.Session) => {
  const userId = session.metadata?.userId;
  const stripeCustomerId = session.customer as string | null;

  if (!userId || !stripeCustomerId) {
    return;
  }

  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user || user.stripeCustomerId === stripeCustomerId) {
    return;
  }

  await prisma.user.update({
    where: { id: userId },
    data: { stripeCustomerId },
  });
};

const upsertSubscription = async (subscription: Stripe.Subscription) => {
  const stripeCustomerId = subscription.customer as string;
  const user = await prisma.user.findFirst({ where: { stripeCustomerId } });

  if (!user) {
    return;
  }

  const priceId = subscription.items.data[0]?.price?.id;

  if (!priceId) {
    return;
  }

  const plan = getPlanFromPriceId(priceId);

  if (!plan) {
    console.warn('PriceId desconhecido para assinatura:', priceId);
  }

  const status = mapSubscriptionStatus(subscription.status);
  const currentPeriodEnd = new Date(subscription.current_period_end * 1000);

  await prisma.subscription.upsert({
    where: { stripeSubscriptionId: subscription.id },
    create: {
      userId: user.id,
      stripeCustomerId,
      stripeSubscriptionId: subscription.id,
      plan: plan ?? DEFAULT_PLAN,
      status,
      currentPeriodEnd,
    },
    update: {
      stripeCustomerId,
      plan: plan ?? DEFAULT_PLAN,
      status,
      currentPeriodEnd,
    },
  });
};

export async function POST(request: Request) {
  const stripe = getStripeClient();
  const signature = headers().get('stripe-signature');
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const payload = await request.text();

  if (!signature || !webhookSecret) {
    return NextResponse.json({ error: 'Webhook não configurado.' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  } catch (error) {
    console.error('Erro ao validar webhook:', error);
    return NextResponse.json({ error: 'Assinatura inválida.' }, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        await ensureCustomerLinkedToUser(session);
        break;
      }
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        await upsertSubscription(subscription);
        break;
      }
      default:
        break;
    }
  } catch (error) {
    console.error('Erro ao processar webhook:', error);
    return NextResponse.json({ error: 'Erro ao processar webhook.' }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
