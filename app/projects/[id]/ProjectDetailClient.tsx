"use client";

import { useEffect, useMemo, useState } from 'react';
import { ContentKitList } from '../../components/ContentKitList';
import { GenerateContentSection } from './GenerateContentSection';
import { kitSummary } from '../../../lib/mock';
import type { EngineKit, ProjectData } from '../../../lib/engine/types';

type ProjectDetail = {
  id: string;
  name: string;
  profileLabel: string;
  projectData: ProjectData;
};

type GenerationSummary = {
  id: string;
  status: string;
  output: EngineKit | null;
  createdAt: string;
};

type ProjectDetailResponse = {
  project: ProjectDetail;
  latestGeneration: GenerationSummary | null;
};

type ProjectDetailClientProps = {
  projectId: string;
};

export function ProjectDetailClient({ projectId }: ProjectDetailClientProps) {
  const [project, setProject] = useState<ProjectDetail | null>(null);
  const [latestGeneration, setLatestGeneration] = useState<GenerationSummary | null>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');

  useEffect(() => {
    let isMounted = true;

    const loadProject = async () => {
      try {
        const response = await fetch(`/api/projects/${projectId}`);
        const data = (await response.json()) as ProjectDetailResponse;

        if (!response.ok) {
          throw new Error('Falha ao carregar projeto');
        }

        if (isMounted) {
          setProject(data.project);
          setLatestGeneration(data.latestGeneration);
          setStatus('ready');
        }
      } catch (error) {
        console.error('Erro ao carregar projeto:', error);
        if (isMounted) {
          setStatus('error');
        }
      }
    };

    loadProject();

    return () => {
      isMounted = false;
    };
  }, [projectId]);

  const latestKit = useMemo(() => latestGeneration?.output ?? null, [latestGeneration]);

  if (status === 'loading') {
    return <p>Carregando projeto…</p>;
  }

  if (status === 'error' || !project) {
    return <p>Não foi possível carregar este projeto agora.</p>;
  }

  const briefing = project.projectData;
  const generationStatus = latestGeneration ? 'Geração salva' : 'Sem gerações';

  return (
    <section className="two-col">
      <div>
        <h2>{project.name}</h2>
        <p className="pill">{project.profileLabel}</p>
        <p>
          Status atual: <strong>{generationStatus}</strong>
        </p>
        <div className="card">
          <h3>Briefing do projeto</h3>
          <ul>
            <li>Produto: {briefing.name}</li>
            <li>Público-alvo: {briefing.audience}</li>
            <li>Diferenciais: {briefing.differentiators.join(', ')}</li>
            <li>Tom de voz: {briefing.tone}</li>
            <li>Canais: {briefing.channels.join(', ')}</li>
          </ul>
        </div>
        <GenerateContentSection
          projectId={projectId}
          projectData={briefing}
          profileLabel={project.profileLabel}
          initialKit={latestKit}
        />
        <div className="card">
          <h3>Editar ou regenerar</h3>
          <p>
            O usuário pode editar conteúdos individualmente, regenerar itens específicos e manter o
            histórico de versões com rastreio de tokens e custo estimado.
          </p>
          <button type="button">Editar conteúdo</button>
          <button type="button">Regenerar anúncio</button>
        </div>
      </div>
      <div>
        <ContentKitList items={kitSummary} />
        {latestGeneration ? (
          <div className="card">
            <h3>Última geração</h3>
            <p>Gerada em {new Date(latestGeneration.createdAt).toLocaleString('pt-BR')}.</p>
          </div>
        ) : null}
        <div className="card">
          <h3>Exportação</h3>
          <p>Baixe o kit em PDF ou posts em CSV para planejar campanhas.</p>
          <button type="button">Exportar PDF</button>
          <button type="button">Exportar CSV</button>
        </div>
      </div>
    </section>
  );
}
