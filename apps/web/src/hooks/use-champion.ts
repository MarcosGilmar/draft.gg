import { fetchChampionByIdAction } from '@/actions/riot/fetchChampionsByIdAction';
import { useQuery } from '@tanstack/react-query';

export function useChampion(id: string) {
  return useQuery({
    queryKey: ['champions', id],
    queryFn: async () => {
      const result = await fetchChampionByIdAction(id);

      if (!result.success) throw new Error(result.error);

      return result.data;
    },
    staleTime: 1000 * 60 * 60,
  });
}
