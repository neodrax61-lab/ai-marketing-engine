import { ProjectDetailClient } from './ProjectDetailClient';

type ProjectPageProps = {
  params: { id: string };
};

export default function ProjectDetailPage({ params }: ProjectPageProps) {
  return <ProjectDetailClient projectId={params.id} />;
}
