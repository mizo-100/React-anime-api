export const MyPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <h1 className="text-2xl font-bold text-gray-800">マイページ</h1>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center gap-6">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold text-2xl border-2 border-green-400">
          U
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-800">ユーザー名（テスト）</h2>
          <p className="text-gray-500 text-sm mt-1">user@example.com</p>
          <span className="inline-block mt-2 bg-green-100 text-green-700 text-xs px-2.5 py-1 rounded-full font-medium">
            プレミアム会員
          </span>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-4">
        <h3 className="text-lg font-bold text-gray-800">お気に入り作品</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          <div className="p-4 border border-gray-100 rounded-lg bg-gray-50 flex items-center gap-4">
            <div className="w-16 h-16 bg-gray-200 rounded-md shrink-0 flex items-center justify-center text-xs text-gray-400">
              No Image
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 text-sm">サンプルお気に入り作品 1</h4>
              <p className="text-xs text-gray-500 mt-1">アクション</p>
            </div>
          </div>

          <div className="p-4 border border-gray-100 rounded-lg bg-gray-50 flex items-center gap-4">
            <div className="w-16 h-16 bg-gray-200 rounded-md shrink-0 flex items-center justify-center text-xs text-gray-400">
              No Image
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 text-sm">サンプルお気に入り作品 2</h4>
              <p className="text-xs text-gray-500 mt-1">ファンタジー</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
