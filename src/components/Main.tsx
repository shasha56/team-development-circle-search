import { SearchBox } from "@/components/SearchBox";
import { CircleList } from "@/components/CircleList";
import { MOCK_CIRCLES } from "@/mock/MockData";
import { useState } from "react";

const MOCK_POPULAR_TAGS = [
  "#タグ1",
  "#タグ2",
  "#タグ3",
  "#タグ4",
  "#タグ5",
  "#タグ6",
  "#タグ7",
  "#タグ8",
];

export const Main = () => {
  const [searchQuery, setSearchQuery] = useState(""); // 検索クエリを親で管理

  // タグクリック時の処理
  const handleTagClick = (tag: string) => {
    setSearchQuery(tag); // タグを検索クエリとしてセット
  };

  return (
    <main>
      <SearchBox onSearch={setSearchQuery} />
      {/* 人気タグ */}
      <div className="flex flex-row items-center justify-center gap-2 m-2">
        <p className="font-[1000] text-sm">人気検索＃タグ</p>
        <div className="flex flex-wrap justify-center gap-2">
          {MOCK_POPULAR_TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className="border-black rounded-sm border-[1.5px] text-xs px-2 py-1 font-bold hover:bg-gray-200 transition-colors cursor-pointer"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
      <CircleList
        circles={MOCK_CIRCLES}
        onTagClick={handleTagClick}
        SearchQuery={searchQuery}
      />
    </main>
  );
};
