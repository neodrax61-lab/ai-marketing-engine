import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/db/prisma';
import { getDevUser } from '../../../../lib/db/getDevUser';
import { profileLabels } from '../../../../lib/db/profile';

type Params = {
  params: { id: string };
};

export async function GET(_request: Request, { params }: Params) {
  try {
    const user = await getDevUser();

    const project = await prisma.project.findFirst({
      where: { id: params.id, userId: user.id },
      include: {
        generations: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
    });

    if (!project) {
      return NextResponse.json({ error: 'Projeto não encontrado.' }, { status: 404 });
    }

    const latestGeneration = project.generations[0] ?? null;

    return NextResponse.json({
      project: {
        id: project.id,
        name: project.name,
        profile: project.profile,
        profileLabel: profileLabels[project.profile],
        projectData: project.projectData,
        createdAt: project.createdAt,
        updatedAt: project.updatedAt,
      },
      latestGeneration: latestGeneration
        ? {
            id: latestGeneration.id,
            status: latestGeneration.status,
            output: latestGeneration.output,
            createdAt: latestGeneration.createdAt,
          }
        : null,
    });
  } catch (error) {
    console.error('Erro ao carregar projeto:', error);
    return NextResponse.json(
      { error: 'Não foi possível carregar o projeto agora.' },
      { status: 500 },
    );
  }
}
