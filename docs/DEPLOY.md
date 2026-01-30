# Deploy em produção (Vercel + Postgres + Stripe)

## Checklist rápido

1) **Criar o projeto na Vercel**
   - Conecte o repositório e faça o primeiro deploy.

2) **Configurar Postgres**
   - Crie o banco (Neon, Supabase, Railway, etc).
   - Defina `DATABASE_URL` nas variáveis de ambiente da Vercel.

3) **Rodar migrations**
   - Execute `npm run prisma:migrate` após o banco estar pronto.

4) **Configurar Stripe**
   - Crie Products + Prices no Stripe.
   - Preencha:
     - `STRIPE_SECRET_KEY`
     - `STRIPE_PRICE_BASIC`
     - `STRIPE_PRICE_PRO`
     - `STRIPE_PRICE_BUSINESS`
   - Configure o webhook:
     - URL: `https://<seu-dominio>/api/billing/webhook`
     - Copie o secret para `STRIPE_WEBHOOK_SECRET`

5) **Configurar OpenAI**
   - Defina `OPENAI_API_KEY`
   - (Opcional) Ajuste `OPENAI_MODEL`

6) **Verificar health check**
   - Abra `https://<seu-dominio>/api/health`
   - Verifique `database`, `openaiConfigured` e `stripeConfigured`.

7) **Testes finais**
   - Faça um checkout real ou em modo de teste.
   - Verifique geração de conteúdo na aplicação.

## Observações

- `DEV_USER_EMAIL` é apenas para ambiente de desenvolvimento. Em produção, o endpoint bloqueia se não houver autenticação real (por enquanto, se `DEV_USER_EMAIL` estiver setado, ele é usado de forma temporária).
