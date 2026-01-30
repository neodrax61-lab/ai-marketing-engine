import './globals.css';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'Motor de Produtos Digitais com IA',
  description: 'Plataforma SaaS para gerar kits de conteúdo e vendas com IA.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <div className="app-shell">
          <header className="header">
            <div>
              <p className="eyebrow">Motor de Produtos Digitais com IA</p>
              <h1>Automatize conteúdo e vendas em minutos.</h1>
            </div>
            <nav>
              <a href="/">Início</a>
              <a href="/dashboard">Dashboard</a>
              <a href="/projects">Projetos</a>
              <a href="/admin">Admin</a>
            </nav>
          </header>
          <main>{children}</main>
          <footer>
            <p>
              Plataforma SaaS em pt-BR com foco em geração responsável de conteúdo e conversão.
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}
