import { useNavigate, useParams } from 'react-router-dom';
import useSWR from 'swr';
import { fetcher, jikanApi } from '../api/jikanApi';
import type { AnimeItem } from '../types/anime';

export const DetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: res, isLoading, error } = useSWR(
    id ? jikanApi.getAnimeDetail(id) : null,
    fetcher
  );

  const anime: AnimeItem | null = res?.data || null;

  const formatDate = (dateString?: string) => {
    if (!dateString) return "不明";
    const date = new Date(dateString);
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-500">
        読み込み中...
      </div>
    );
  }

  if (error || !anime) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <p className="text-red-500 font-semibold">データの取得に失敗しました。</p>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
        >
          戻る
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <button
        onClick={() => navigate(-1)}
        className="text-green-600 hover:text-green-800 font-medium flex items-center gap-1 text-sm transition-colors"
      >
        ← 一覧に戻る
      </button>

      <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden p-6 md:p-8 space-y-8">

        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-800">
            {anime.title_japanese || anime.title}
          </h1>
          {anime.title_japanese && anime.title !== anime.title_japanese && (
            <p className="text-gray-500 text-sm">({anime.title})</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className="aspect-3/4 rounded-xl overflow-hidden shadow-sm bg-gray-100">
              <img
                src={anime.images.jpg.large_image_url || anime.images.jpg.image_url}
                alt={anime.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="md:col-span-2 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">公開日</h3>
                <p className="text-gray-700 font-medium mt-1">
                  {formatDate(anime.aired?.from)}
                </p>
              </div>

              <div>
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">ジャンル</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {anime.genres && anime.genres.length > 0 ? (
                    anime.genres.map((genre) => (
                      <span
                        key={genre.mal_id}
                        className="bg-indigo-50 text-green-700 text-xs px-3 py-1 rounded-full font-medium"
                      >
                        {genre.name}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-500 text-sm">ジャンル情報なし</span>
                  )}
                </div>
              </div>
            </div>

            {anime.url && (
              <div>
                <a
                  href={anime.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full md:w-auto px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-xl shadow-sm transition-colors text-sm"
                >
                  公式サイト・詳細情報を見る ↗
                </a>
              </div>
            )}
          </div>
        </div>

        <hr className="border-gray-100" />

        <div className="space-y-3">
          <h3 className="text-lg font-bold text-gray-800">あらすじ・詳細</h3>
          <p className="text-gray-600 leading-relaxed whitespace-pre-line text-sm md:text-base">
            {anime.synopsis || 'あらすじ情報はありません。'}
          </p>
        </div>

      </div>
    </div>
  );
}
