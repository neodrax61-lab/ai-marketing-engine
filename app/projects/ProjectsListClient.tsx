'use client';

import { useEffect, useState } from 'react';
import { ProjectCard } from '../components/ProjectCard';

type ProjectListItem = {
  id: string;
  name: string;
  profileLabel: string;
  status: string;
  updatedAt: string;
};

type ProjectsResponse = {
  projects: ProjectListItem[];
};

const formatDate = (value: string) =>
  new Date(value).toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

export function ProjectsListClient() {
  const [projects, setProjects] = useState<ProjectListItem[]>([]);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');

  useEffect(() => {
    let isMounted = true;

    const loadProjects = async () => {
      try {
        const response = await fetch('/api/projects');
        const data = (await response.json()) as ProjectsResponse;

        if (!response.ok) {
          throw new Error('Falha ao carregar projetos');
        }

        if (isMounted) {
          setProjects(data.projects ?? []);
          setStatus('ready');
        }
      } catch (error) {
        console.error('Erro ao carregar projetos:', error);
        if (isMounted) {
          setStatus('error');
        }
      }
    };

    loadProjects();

    return () => {
      isMounted = false;
    };
  }, []);

  if (status === 'loading') {
    return <p>Carregando projetos…</p>;
  }

  if (status === 'error') {
    return <p>Não foi possível carregar os projetos agora.</p>;
  }

  if (projects.length === 0) {
    return <p>Você ainda não criou nenhum projeto.</p>;
  }

  return (
    <div className="card-grid">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          name={project.name}
          profile={project.profileLabel}
          status={project.status}
          updatedAt={formatDate(project.updatedAt)}
          actions={<a href={`/projects/${project.id}`}>Ver detalhes →</a>}
        />
      ))}
    </div>
  );
}
