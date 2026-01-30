import { NextResponse } from 'next/server';
import { generateKit } from '../../../lib/engine/generateKit';
import type { GenerateRequest, GenerateResponse } from '../../../lib/engine/api';
import { getDevUser } from '../../../lib/db/getDevUser';
import {
  requireActiveSubscription,
  SubscriptionRequiredError,
} from '../../../lib/billing/requireActiveSubscription';

const isGenerateRequest = (payload: unknown): payload is GenerateRequest => {
  if (!payload || typeof payload !== 'object') {
    return false;
  }

  const data = payload as GenerateRequest;
  return Boolean(data.profile && data.projectData);
};

export async function POST(request: Request): Promise<NextResponse<GenerateResponse>> {
  try {
    const payload = (await request.json()) as unknown;

    if (!isGenerateRequest(payload)) {
      return NextResponse.json({ error: 'Dados inválidos para gerar conteúdo.' }, { status: 400 });
    }

    const user = await getDevUser();
    await requireActiveSubscription(user.id);

    const { projectData, profile } = payload;
    const kit = await generateKit(projectData, profile);

    return NextResponse.json({ kit });
  } catch (error) {
    if (error instanceof SubscriptionRequiredError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status },
      );
    }
    console.error('Erro ao gerar conteúdo:', error);
    return NextResponse.json(
      { error: 'Não foi possível gerar o conteúdo agora. Tente novamente em instantes.' },
      { status: 500 },
    );
  }
}
