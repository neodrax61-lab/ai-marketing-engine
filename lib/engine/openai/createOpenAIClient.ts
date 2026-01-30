import OpenAI from 'openai';
import { createMockOpenAIClient } from '../mockOpenAI';
import type { GenerateJSONArgs, LLMClient, SchemaName, WithMeta } from '../types';
import { responseSchemas, validateResponse } from './responseSchemas';

const DEFAULT_MODEL = 'gpt-4.1-mini';

const COST_PER_1K_TOKENS_USD: Record<string, number> = {
  'gpt-4.1-mini': 0.0004,
};

const isRetryableError = (error: unknown): boolean => {
  if (!error || typeof error !== 'object') {
    return false;
  }

  const status = (error as { status?: number }).status;

  return status ? [429, 500, 502, 503, 504].includes(status) : false;
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const extractOutputText = (response: OpenAI.Responses.Response): string => {
  if (response.output_text) {
    return response.output_text;
  }

  const firstOutput = response.output?.[0];
  const firstContent = firstOutput?.content?.[0];

  if (firstContent && 'text' in firstContent && typeof firstContent.text === 'string') {
    return firstContent.text;
  }

  throw new Error('Resposta da OpenAI não trouxe texto utilizável.');
};

const buildMeta = (
  response: OpenAI.Responses.Response,
  model: string,
): WithMeta<Record<string, unknown>>['meta'] => {
  const totalTokens = response.usage?.total_tokens ?? null;
  const costPer1K = COST_PER_1K_TOKENS_USD[model];
  const totalCostEstimate =
    totalTokens && costPer1K ? Number(((totalTokens / 1000) * costPer1K).toFixed(6)) : null;

  return {
    totalTokens,
    totalCostEstimate,
    model,
  };
};

export const createOpenAIClient = (): LLMClient => {
  const useMock =
    process.env.ENGINE_USE_MOCK === 'true' || !process.env.OPENAI_API_KEY?.trim();

  if (useMock) {
    return createMockOpenAIClient();
  }

  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const model = process.env.OPENAI_MODEL?.trim() || DEFAULT_MODEL;

  return {
    async generateJSON<T>(args: GenerateJSONArgs): Promise<T> {
      const schemaName = (args.schemaName ?? 'posts') as SchemaName;
      const schema = args.schema ?? responseSchemas[schemaName];

      if (!schema) {
        throw new Error(`Schema não encontrado para ${schemaName}.`);
      }

      for (let attempt = 0; attempt < 3; attempt += 1) {
        try {
          const response = await client.responses.create({
            model,
            input: [
              { role: 'system', content: args.system },
              { role: 'user', content: args.user },
            ],
            temperature: args.temperature,
            max_output_tokens: args.maxTokens,
            response_format: {
              type: 'json_schema',
              json_schema: {
                name: schemaName,
                schema,
                strict: true,
              },
            },
          });

          const outputText = extractOutputText(response);
          const parsed = JSON.parse(outputText);

          if (!validateResponse(schemaName, parsed)) {
            throw new Error(`Resposta inválida para schema ${schemaName}.`);
          }

          const meta = buildMeta(response, model);
          const result = { ...(parsed as Record<string, unknown>), meta } as WithMeta<T>;

          return result as T;
        } catch (error) {
          const invalidResponse =
            error instanceof Error &&
            (error.name === 'SyntaxError' ||
              error.message.includes('Resposta inválida') ||
              error.message.includes('Resposta da OpenAI não trouxe texto utilizável'));
          const isRetryable = isRetryableError(error) || invalidResponse;
          const isLastAttempt = attempt >= 2;

          if (isLastAttempt || !isRetryable) {
            if (error instanceof Error && error.message.includes('Resposta inválida')) {
              throw new Error(
                `A OpenAI não retornou JSON válido para ${schemaName} após ${attempt + 1} tentativas.`,
              );
            }

            if (invalidResponse) {
              throw new Error(
                `A OpenAI não retornou JSON válido para ${schemaName} após ${attempt + 1} tentativas.`,
              );
            }

            throw error;
          }

          await sleep(300 * (attempt + 1));
        }
      }

      throw new Error('Falha inesperada ao gerar resposta da OpenAI.');
    },
  };
};
