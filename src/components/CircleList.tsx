import Image from "next/image";

type Props = {
  circles: {
    id: number;
    name: string;
    iconUrl: string;
    description: string;
    tags: string[];
    twitterUrl: string;
    instagramUrl: string;
  }[];
  onTagClick: (tag: string) => void;
  SearchQuery: string;
};

export const CircleList: React.FC<Props> = ({
  circles,
  onTagClick,
  SearchQuery,
}) => {
  const query = SearchQuery.toLowerCase(); // 小文字化
  // --- フィルタリングロジック ---
  const filteredCircles = circles.filter((circle) => {
    // 検索クエリが空の場合、すべてを表示
    if (!query) {
      return true;
    }
    // 名前、説明、タグにクエリが含まれているかをチェック
    return (
      circle.name.includes(query) || // サークル名に含むか
      circle.description.includes(query) || // 説明に含むか
      circle.tags.some((tag) => tag.toLowerCase().includes(query)) // タグに含むか
    );
  });

  return (
    <div className="w-full bg-[#C0C0C0] py-2">
      {filteredCircles.length > 0 ? (
        filteredCircles.map((circle) => (
          <div
            key={circle.id}
            className="relative w-[95%] sm:w-4/5 lg:w-[90%] min-h-28 sm:min-h-32 bg-white border border-black mx-auto my-5 flex items-center"
          >
            {/* サークルアイコン */}
            <div className="relative shrink-0 ml-2.5 w-24 h-24 sm:w-28 sm:h-28">
              <Image
                src={circle.iconUrl || "/icon/dummy_icon.png"}
                alt={`${circle.name}のアイコン`}
                fill
                className="object-cover"
                unoptimized
              />
            </div>

            {/* タグ・URL エリア */}
            <div className="ml-5 flex flex-col gap-1 py-2">
              <p className="font-bold text-sm">{circle.name}</p>

              {/* タグ */}
              <div className="flex flex-wrap gap-1">
                {circle.tags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => onTagClick(tag)}
                    className="border border-black text-xs px-2 py-0.5 cursor-pointer hover:bg-gray-100 transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>

              {/* 公式リンク */}
              <div className="flex gap-3">
                {circle.twitterUrl && (
                  <a
                    href={circle.twitterUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 underline hover:text-blue-800"
                  >
                    公式X
                  </a>
                )}
                {circle.instagramUrl && (
                  <a
                    href={circle.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-pink-600 underline hover:text-pink-800"
                  >
                    公式Instagram
                  </a>
                )}
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center py-10 text-gray-600 font-medium">
          該当するサークルが見つかりませんでした。
        </p>
      )}
    </div>
  );
};
