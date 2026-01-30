import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/db/prisma';
import { getDevUser } from '../../../lib/db/getDevUser';
import { isProjectProfile, profileLabels } from '../../../lib/db/profile';
import type { ProjectData } from '../../../lib/engine/types';

type CreateProjectPayload = {
  name: string;
  profile: string;
  projectData: ProjectData;
};

const isProjectData = (value: unknown): value is ProjectData => {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const data = value as ProjectData;
  return Boolean(
    data.name &&
      data.description &&
      data.audience &&
      data.offer &&
      Array.isArray(data.differentiators) &&
      Array.isArray(data.objections) &&
      data.tone &&
      Array.isArray(data.channels),
  );
};

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as CreateProjectPayload;

    if (!payload || typeof payload !== 'object') {
      return NextResponse.json({ error: 'Dados inválidos.' }, { status: 400 });
    }

    const { name, profile, projectData } = payload;

    if (!name || typeof name !== 'string' || !isProjectProfile(profile) || !isProjectData(projectData)) {
      return NextResponse.json({ error: 'Dados inválidos.' }, { status: 400 });
    }

    const user = await getDevUser();

    const project = await prisma.project.create({
      data: {
        name,
        profile,
        projectData,
        userId: user.id,
      },
    });

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
    });
  } catch (error) {
    console.error('Erro ao criar projeto:', error);
    return NextResponse.json(
      { error: 'Não foi possível criar o projeto agora.' },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const user = await getDevUser();

    const projects = await prisma.project.findMany({
      where: { userId: user.id },
      orderBy: { updatedAt: 'desc' },
      include: {
        generations: {
          select: { createdAt: true },
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
    });

    return NextResponse.json({
      projects: projects.map((project) => {
        const latestGenerationAt = project.generations[0]?.createdAt ?? null;
        const status = latestGenerationAt ? 'Geração salva' : 'Sem gerações';
        return {
          id: project.id,
          name: project.name,
          profile: project.profile,
          profileLabel: profileLabels[project.profile],
          status,
          updatedAt: project.updatedAt,
          latestGenerationAt,
        };
      }),
    });
  } catch (error) {
    console.error('Erro ao listar projetos:', error);
    return NextResponse.json(
      { error: 'Não foi possível carregar os projetos agora.' },
      { status: 500 },
    );
  }
}
