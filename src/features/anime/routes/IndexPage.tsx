import { useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import { fetcher, jikanApi } from '../api/jikanApi';
import { genreSections } from '../const/genres';
import type { AnimeItem } from '../types/anime';

export const IndexPage = () => {
  const navigate = useNavigate();

  const { data: bannerRes, isLoading: isBannerLoading } = useSWR(
    jikanApi.getRandomAnime,
    fetcher
  );
  const bannerAnime: AnimeItem | null = bannerRes?.data || null;

  const truncateSynopsis = (text: string) => {
    if (!text) return '詳細はありません。';
    return text.length > 150 ? text.slice(0, 150) + "..." : text;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-12">
      <section className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
        {isBannerLoading ? (
          <div className="h-64 flex items-center justify-center bg-gray-100 text-gray-400">
            バナー読み込み中...
          </div>
        ) : bannerAnime ? (
          <div
            onClick={() => navigate(`/detail/${bannerAnime.mal_id}`)}
            className="cursor-pointer md:flex group"
          >
            <div className="md:w-auto lg:w-90 h-64 md:h-auto bg-gray-100 shrink-0 m-4 rounded-xl overflow-hidden">
              <img
                src={bannerAnime.images.jpg.large_image_url || bannerAnime.images.jpg.image_url}
                alt={bannerAnime.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            <div className="flex-1 p-6 md:p-8 flex flex-col justify-center space-y-4">
              <h3 className="text-2xl font-bold transition-colors">
                {bannerAnime.title_japanese || bannerAnime.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {truncateSynopsis(bannerAnime.synopsis)}
              </p>
            </div>
          </div>
        ) : (
          <div className="p-6 text-center text-gray-500">バナーの取得に失敗しました</div>
        )}
      </section>

      <div className="space-y-12">
        {genreSections.map((genre) => {
          const { data } = useSWR(jikanApi.getAnimeByGenre(genre.id), fetcher);
          const animeList: AnimeItem[] = data?.data || [];

          return (
            <section key={genre.id} className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-800 border-l-4 border-green-600 pl-3">
                {genre.title}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {animeList.map((anime) => (
                  <div
                    key={anime.mal_id}
                    onClick={() => navigate(`/detail/${anime.mal_id}`)}
                    className="cursor-pointer group flex flex-col bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="overflow-hidden aspect-3/4 bg-gray-100">
                      <img
                        src={anime.images.jpg.image_url}
                        alt={anime.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-3 flex-1 flex flex-col justify-between">
                      <h4 className="font-semibold text-gray-800 text-sm line-clamp-2">
                        {anime.title_japanese || anime.title}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
