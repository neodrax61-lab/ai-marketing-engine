'use client';

import { useMemo, useState } from 'react';
import type { EngineKit, ProjectData } from '../../../lib/engine/types';
import type { GenerateResponse } from '../../../lib/engine/api';

const defaultErrorMessage = 'Não foi possível gerar o conteúdo agora. Tente novamente.';

type GenerateContentSectionProps = {
  projectId: string;
  projectData: ProjectData;
  profileLabel: string;
  initialKit?: EngineKit | null;
};

type GenerationStatus = 'idle' | 'loading' | 'success' | 'error';

export function GenerateContentSection({
  projectId,
  projectData,
  profileLabel,
  initialKit = null,
}: GenerateContentSectionProps) {
  const [status, setStatus] = useState<GenerationStatus>('idle');
  const [kit, setKit] = useState<EngineKit | null>(initialKit);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const hasResult = kit;

  const handleGenerate = async () => {
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch(`/api/projects/${projectId}/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectData }),
      });

      const data = (await response.json()) as GenerateResponse;

      if (!response.ok || 'error' in data) {
        setStatus('error');
        setErrorMessage('error' in data ? data.error : defaultErrorMessage);
        return;
      }

      setKit(data.kit);
      setStatus('success');
    } catch (error) {
      console.error('Erro ao chamar /api/generate:', error);
      setStatus('error');
      setErrorMessage(defaultErrorMessage);
    }
  };

  const posts = useMemo(() => kit?.posts.itens ?? [], [kit]);
  const stories = useMemo(() => kit?.stories.sequencias ?? [], [kit]);
  const reels = useMemo(() => kit?.reels.itens ?? [], [kit]);

  return (
    <div className="card">
      <h3>Gerar conteúdo com IA</h3>
      <p>Dispare uma nova geração completa com base no briefing do projeto.</p>
      <p>
        Perfil selecionado: <strong>{profileLabel}</strong>
      </p>
      <button type="button" onClick={handleGenerate} disabled={status === 'loading'}>
        {status === 'loading' ? 'Gerando conteúdo…' : 'Gerar conteúdo'}
      </button>

      {status === 'loading' ? <p>Gerando conteúdo… isso pode levar alguns segundos.</p> : null}
      {status === 'error' ? <p>{errorMessage}</p> : null}

      {hasResult ? (
        <div style={{ marginTop: '20px' }}>
          <h4>Posts</h4>
          <div className="card-grid">
            {posts.map((post) => (
              <div key={post.id} className="card">
                <p className="badge">{post.objetivo}</p>
                <h4>{post.titulo}</h4>
                <p>{post.legenda}</p>
                <p>
                  <strong>CTA:</strong> {post.cta}
                </p>
              </div>
            ))}
          </div>

          <h4 style={{ marginTop: '24px' }}>Stories</h4>
          <div className="card-grid">
            {stories.map((story) => (
              <div key={story.id} className="card">
                <p className="badge">{story.objetivo}</p>
                <h4>{story.titulo}</h4>
                <ul>
                  {story.frames.map((frame) => (
                    <li key={frame.ordem}>{frame.texto}</li>
                  ))}
                </ul>
                <p>
                  <strong>CTA:</strong> {story.cta}
                </p>
              </div>
            ))}
          </div>

          <h4 style={{ marginTop: '24px' }}>Reels</h4>
          <div className="card-grid">
            {reels.map((reel) => (
              <div key={reel.id} className="card">
                <h4>{reel.gancho}</h4>
                <ol>
                  {reel.roteiro.map((step, index) => (
                    <li key={`${reel.id}-step-${index}`}>{step}</li>
                  ))}
                </ol>
                <p>
                  <strong>Fechamento:</strong> {reel.fechamento}
                </p>
                <p>
                  <strong>CTA:</strong> {reel.cta}
                </p>
              </div>
            ))}
          </div>

          <h4 style={{ marginTop: '24px' }}>Oferta</h4>
          <div className="card">
            <h4>{kit.oferta.headline}</h4>
            <p>{kit.oferta.subheadline}</p>
            <ul>
              {kit.oferta.bullets.map((bullet, index) => (
                <li key={`${kit.oferta.headline}-${index}`}>{bullet}</li>
              ))}
            </ul>
            {kit.oferta.garantia ? (
              <p>
                <strong>Garantia:</strong> {kit.oferta.garantia}
              </p>
            ) : null}
            <p>
              <strong>CTA:</strong> {kit.oferta.cta}
            </p>
            <ul>
              {kit.oferta.observacoes.map((item, index) => (
                <li key={`${kit.oferta.cta}-${index}`}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  );
}
