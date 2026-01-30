import type { ReactNode } from 'react';

export type ProjectCardProps = {
  name: string;
  profile: string;
  status: string;
  updatedAt: string;
  actions?: ReactNode;
};

export function ProjectCard({ name, profile, status, updatedAt, actions }: ProjectCardProps) {
  return (
    <div className="card">
      <p className="badge">{profile}</p>
      <h3>{name}</h3>
      <p>{status}</p>
      <p>
        <strong>Atualizado:</strong> {updatedAt}
      </p>
      {actions && <div>{actions}</div>}
    </div>
  );
}
