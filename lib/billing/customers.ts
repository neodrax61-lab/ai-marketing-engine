import type { User } from '@prisma/client';
import { prisma } from '../db/prisma';
import { getStripeClient } from './stripe';

export const getOrCreateStripeCustomerId = async (user: User) => {
  if (user.stripeCustomerId) {
    return user.stripeCustomerId;
  }

  const stripe = getStripeClient();
  const customer = await stripe.customers.create({
    email: user.email,
    metadata: {
      userId: user.id,
    },
  });

  const updated = await prisma.user.update({
    where: { id: user.id },
    data: { stripeCustomerId: customer.id },
  });

  return updated.stripeCustomerId!;
};
