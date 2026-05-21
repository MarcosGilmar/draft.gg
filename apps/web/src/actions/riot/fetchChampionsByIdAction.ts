'use server';

import { api } from '@/lib/api';
import { NestErrorResponse } from '@/lib/api/errors';
import { ChampionProps } from '@repo/shared/types/champion';
import { isAxiosError } from 'axios';

type FetchChampionByIdActionResult<T> =
  | { success: true; data: T }
  | { success: false; error: string };

type ChampionResponse = { champion: ChampionProps };

export async function fetchChampionByIdAction(
  id: string,
): Promise<FetchChampionByIdActionResult<ChampionProps>> {
  try {
    const response = await api.get<ChampionResponse>(`/champions/${id}`);

    return { success: true, data: response.data.champion };
  } catch (error: unknown) {
    if (isAxiosError<NestErrorResponse>(error)) {
      if (error.response && error.response?.status === 404) {
        const fallbackErrorMessage = 'Erro ao carregar campeão';
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
