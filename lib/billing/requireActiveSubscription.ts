import { prisma } from '../db/prisma';

export class SubscriptionRequiredError extends Error {
  status = 402;
}

export const requireActiveSubscription = async (userId: string) => {
  const subscription = await prisma.subscription.findUnique({
    where: { userId },
  });

  const now = new Date();

  if (!subscription || subscription.status !== 'active' || subscription.currentPeriodEnd <= now) {
    throw new SubscriptionRequiredError('Assinatura ativa necessária para gerar conteúdo.');
  }

  return subscription;
};
