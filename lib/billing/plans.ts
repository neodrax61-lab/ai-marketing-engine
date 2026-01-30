export const PLAN_PRICE_LOOKUP = {
  basic: process.env.STRIPE_PRICE_BASIC ?? '',
  pro: process.env.STRIPE_PRICE_PRO ?? '',
  business: process.env.STRIPE_PRICE_BUSINESS ?? '',
} as const;

export type BillingPlan = keyof typeof PLAN_PRICE_LOOKUP;

export const isBillingPlan = (plan: string): plan is BillingPlan =>
  Object.prototype.hasOwnProperty.call(PLAN_PRICE_LOOKUP, plan);

export const getPriceIdForPlan = (plan: BillingPlan) => {
  const priceId = PLAN_PRICE_LOOKUP[plan];

  if (!priceId) {
    throw new Error(`STRIPE_PRICE_${plan.toUpperCase()} não definido.`);
  }

  return priceId;
};

export const getPlanFromPriceId = (priceId: string) => {
  const entry = Object.entries(PLAN_PRICE_LOOKUP).find(([, value]) => value === priceId);
  return entry?.[0] as BillingPlan | undefined;
};
