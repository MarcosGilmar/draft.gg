import { fetchChampionsAction } from '@/actions/riot/fetchChampion';
import { useQuery } from '@tanstack/react-query';

export function useChampions() {
  return useQuery({
    queryKey: ['champions'],
    queryFn: async () => {
      const result = await fetchChampionsAction();

      if (!result.success) throw new Error(result.error);

      return result.data;
    },
    staleTime: 1000 * 60 * 60,
  });
}
