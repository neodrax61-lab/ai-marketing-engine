# Motor de Produtos Digitais com IA

Plataforma SaaS em pt-BR para geração automática de conteúdo e vendas com IA, focada em conversão e compliance.

## Visão geral
- Autenticação por email (magic link ou senha) com proteção de rotas.
- Cobrança recorrente via Stripe, planos mensal/anual, limites de geração e bloqueio automático.
- Onboarding obrigatório para capturar dados de projeto.
- Engine única de geração com prompts versionados, respostas em JSON e métricas de custo.
- Histórico de projetos, edição, regeneração e exportação (PDF/CSV).

## Estrutura sugerida
- `app/`: páginas Next.js (dashboard, onboarding, projetos, admin).
- `lib/`: mocks e utilitários de domínio.

## Próximos passos de implementação
1. Integrar autenticação (NextAuth ou solução custom com magic link).
2. Adicionar Stripe + webhooks para criação/atualização/cancelamento de assinaturas.
3. Persistir dados em PostgreSQL com Prisma.
4. Conectar a engine de geração via API da OpenAI.
5. Criar endpoints para exportação de PDF e CSV.

## Scripts
- `npm run dev`
- `npm run build`
- `npm run start`
