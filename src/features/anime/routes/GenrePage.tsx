import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import { fetcher, jikanApi } from '../api/jikanApi';
import type { AnimeItem, GenreItem } from '../types/anime';

export const GenrePage = () => {
  const navigate = useNavigate();
  const [selectedGenre, setSelectedGenre] = useState<{ id: number; name: string } | null>(null);

  const { data: genresRes, isLoading: isGenresLoading } = useSWR(jikanApi.getGenres, fetcher);
  const genres: GenreItem[] = genresRes?.data || [];

  const { data: animeRes, isLoading: isAnimeLoading } = useSWR(
    selectedGenre ? jikanApi.getAnimeByGenre(selectedGenre.id) : null,
    fetcher
  );
  const animeList: AnimeItem[] = animeRes?.data || [];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800">ジャンル一覧</h1>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">ジャンルを選択</h2>
        {isGenresLoading ? (
          <div className="text-center py-8 text-gray-400">ジャンルを読み込み中...</div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {genres.map((genre) => {
              const isSelected = selectedGenre?.id === genre.mal_id;
              return (
                <button
                  key={genre.mal_id}
                  onClick={() => setSelectedGenre({ id: genre.mal_id, name: genre.name })}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    isSelected ? 'bg-green-600 text-white shadow-sm' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {genre.name}
                  <span className="ml-1.5 text-xs opacity-75">({genre.count})</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {selectedGenre && (
        <div className="space-y-6 pt-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-800 border-l-4 border-green-600 pl-3">
              {selectedGenre.name}
            </h2>
            <button onClick={() => setSelectedGenre(null)} className="text-xs text-gray-500 hover:text-gray-700 underline">
              選択を解除
            </button>
          </div>

          {isAnimeLoading ? (
            <div className="text-center py-16 text-gray-400">読み込み中...</div>
          ) : animeList.length > 0 ? (
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
                  <div className="p-3">
                    <h3 className="font-semibold text-gray-800 text-sm line-clamp-2">
                      {anime.title_japanese || anime.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500 bg-white rounded-xl border border-gray-100">
              該当するアニメが見つかりませんでした。
            </div>
          )}
        </div>
      )}
    </div>
  );
}
