import { axiosInstance } from "../../../libs/axios";

export const fetcher = async (url: string) => {
  const response = await axiosInstance.get(url);
  return response.data;
};

export const jikanApi = {
  getRandomAnime: "/random/anime",
  getAnimeByGenre: (genreId: number) => `/anime?genres=${genreId}&limit=20`,
  getAnimeDetail: (id: string | number) => `/anime/${id}`,
  getGenres: "/genres/anime",
};


/*
//テスト用コード

import { axiosInstance } from "../../../libs/axios";
import type { AnimeItem } from "../types/anime";

const MOCK_ANIME_LIST: AnimeItem[] = Array.from({ length: 20 }, (_, i) => ({
  mal_id: i + 1,
  title: `サンプルアニメタイトル ${i + 1}`,
  title_japanese: `テスト作品 ${i + 1}`,
  synopsis: `これはダミーのあらすじです。レイアウト確認用に表示しています。${i + 1}話まで放送中。`,
  url: "#",
  images: {
    jpg: {
      image_url: `https://picsum.photos/300/400?random=${i}`,
      large_image_url: `https://picsum.photos/600/800?random=${i}`,
    },
  },
  genres: [{ mal_id: 1, name: "テスト" }],
}));

const MOCK_BANNER: AnimeItem = MOCK_ANIME_LIST[0];

export const fetcher = async (url: string) => {

console.log(`[Mock Fetching] ${url}`);
  await new Promise((resolve) => setTimeout(resolve, 500));

  if (url.startsWith("/anime/") && url !== jikanApi.getGenres) {
    return { data: MOCK_BANNER };
  }
  if (url === jikanApi.getGenres) {
    return {
      data: [
        { mal_id: 1, name: "アクション", count: 1200 },
        { mal_id: 4, name: "コメディ", count: 950 },
        { mal_id: 10, name: "ファンタジー", count: 1100 },
        { mal_id: 22, name: "ロマンス", count: 600 },
        { mal_id: 24, name: "サイエンスフィクション", count: 800 },
      ],
    };
  }
  if (url === jikanApi.getRandomAnime) {
    return { data: MOCK_BANNER };
  }
  if (url.includes('/anime?genres=')) {
    return { data: MOCK_ANIME_LIST };
  }

  const response = await axiosInstance.get(url);
  return response.data;
};
export const jikanApi = {
  getRandomAnime: "/random/anime",
  getAnimeByGenre: (genreId: number) => `/anime?genres=${genreId}&limit=20`,
  getAnimeDetail: (id: string | number) => `/anime/${id}`,
  getGenres: "/genres/anime",
};
*/
