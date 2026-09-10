import useSWR from 'swr';
import { fetcher, jikanApi } from '../api/jikanApi';
import type { AnimeItem } from '../types/anime';

export const useAnimeDetail = (id?: string) => {
  const { data: res, isLoading, error } = useSWR(
    id ? jikanApi.getAnimeDetail(id) : null,
    fetcher
  );

  const anime: AnimeItem | null = res?.data ?? null;

  return {
    anime,
    isLoading,
    error,
  };
}
