'use server';

import { api } from '@/lib/api';
import { NestErrorResponse } from '@/lib/api/errors';
import { ChampionProps } from '@repo/shared/types/champion';
import { isAxiosError } from 'axios';

type FetchChampionActionResult<T> =
  | { success: true; data: T }
  | { success: false; error: string };

type ChampionsResponse = { champions: ChampionProps[] };

export async function fetchChampionsAction(): Promise<
  FetchChampionActionResult<ChampionProps[]>
> {
  try {
    const response = await api.get<ChampionsResponse>('/champions');

    return { success: true, data: response.data.champions };
  } catch (error: unknown) {
    if (isAxiosError<NestErrorResponse>(error)) {
      if (error.response && error.response?.status === 500) {
        const fallbackErrorMessage = 'Erro ao carregar campeões';
        return {
          success: false,
          error: Array.isArray(error.response.data.message)
            ? (error.response.data.message[0] ?? fallbackErrorMessage)
            : (error.response.data.message ?? fallbackErrorMessage),
        };
      }
    }

    return { success: false, error: 'Erro inesperado. Tente novamente' };
  }
}
