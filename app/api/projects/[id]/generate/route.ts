import { NextResponse } from 'next/server';
import { generateKit } from '../../../../../lib/engine/generateKit';
import { prisma } from '../../../../../lib/db/prisma';
import { getDevUser } from '../../../../../lib/db/getDevUser';
import { profileToEngine } from '../../../../../lib/db/profile';
import type { EngineKit, ProjectData } from '../../../../../lib/engine/types';
import {
  requireActiveSubscription,
  SubscriptionRequiredError,
} from '../../../../../lib/billing/requireActiveSubscription';

type Params = {
  params: { id: string };
};

export async function POST(_request: Request, { params }: Params) {
  try {
    const user = await getDevUser();
    await requireActiveSubscription(user.id);

    const project = await prisma.project.findFirst({
      where: { id: params.id, userId: user.id },
    });

    if (!project) {
      return NextResponse.json({ error: 'Projeto não encontrado.' }, { status: 404 });
    }

    const profile = profileToEngine[project.profile];
    const projectData = project.projectData as ProjectData;

    let kit: EngineKit;

    try {
      kit = await generateKit(projectData, profile);
    } catch (error) {
      await prisma.generation.create({
        data: {
          projectId: project.id,
          userId: user.id,
          status: 'error',
          input: {
            profile: project.profile,
            projectData,
          },
          output: null,
          meta: {
            error: error instanceof Error ? error.message : 'Erro desconhecido',
          },
        },
      });
      throw error;
    }

    await prisma.$transaction(async (tx) => {
      await tx.generation.create({
        data: {
          projectId: project.id,
          userId: user.id,
          status: 'success',
          input: {
            profile: project.profile,
            projectData,
          },
          output: kit,
          meta: null,
        },
      });

      await tx.project.update({
        where: { id: project.id },
        data: { updatedAt: new Date() },
      });
    });

    return NextResponse.json({ kit });
  } catch (error) {
    if (error instanceof SubscriptionRequiredError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status },
      );
    }
    console.error('Erro ao gerar conteúdo do projeto:', error);
    return NextResponse.json(
      { error: 'Não foi possível gerar o conteúdo agora.' },
      { status: 500 },
    );
  }
}
