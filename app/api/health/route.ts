import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/db/prisma';

export async function GET() {
  let databaseOk = false;

  try {
    await prisma.$queryRaw`SELECT 1`;
    databaseOk = true;
  } catch (error) {
    console.error('Health check database error:', error);
  }

  const openaiConfigured = Boolean(process.env.OPENAI_API_KEY);
  const stripeConfigured =
    Boolean(process.env.STRIPE_SECRET_KEY) &&
    Boolean(process.env.STRIPE_WEBHOOK_SECRET) &&
    Boolean(process.env.STRIPE_PRICE_BASIC) &&
    Boolean(process.env.STRIPE_PRICE_PRO) &&
    Boolean(process.env.STRIPE_PRICE_BUSINESS);

  return NextResponse.json({
    status: 'ok',
    database: databaseOk,
    openaiConfigured,
    stripeConfigured,
  });
}
