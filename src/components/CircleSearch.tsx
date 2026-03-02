"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import CircleCard from "./CircleCard";
import type { Circle } from "@/types/circle";

// ダミーデータ（実際は API / DB から取得する想定）
const ALL_CIRCLES: Circle[] = [
  {
    id: 1,
    name: "サークル名1",
    iconUrl: "https://placehold.jp/150x150.png",
    description: "サークル1の説明文がここに入ります。",
    tags: ["#タグ1", "#タグ2", "#タグ3"],
    twitterUrl: "",
    instagramUrl: "",
  },
  {
    id: 2,
    name: "サークル名2",
    iconUrl: "https://placehold.jp/150x150.png",
    description: "サークル2の説明文がここに入ります。",
    tags: ["#タグ1", "#タグ2", "#タグ3"],
    twitterUrl: "",
    instagramUrl: "",
  },
  {
    id: 3,
    name: "サークル名3",
    iconUrl: "https://placehold.jp/150x150.png",
    description: "サークル3の説明文がここに入ります。",
    tags: ["#タグ1", "#タグ2", "#タグ3"],
    twitterUrl: "",
    instagramUrl: "",
  },
];

const POPULAR_TAGS = [
  "#タグ1",
  "#タグ2",
  "#タグ3",
  "#タグ4",
  "#タグ5",
  "#タグ6",
  "#タグ7",
  "#タグ8",
];

export default function CircleSearch() {
  // --- State ---
  const [inputValue, setInputValue] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // --- 検索ロジック（useMemo で派生 state として計算）---
  const filteredCircles = useMemo<Circle[]>(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return ALL_CIRCLES;
    return ALL_CIRCLES.filter(
      (circle) =>
        circle.name.toLowerCase().includes(q) ||
        circle.description.toLowerCase().includes(q) ||
        circle.tags.some((tag) => tag.toLowerCase().includes(q)),
    );
  }, [searchQuery]);

  // --- ハンドラ ---
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchQuery(inputValue);
  };

  const handleTagClick = (tag: string) => {
    setInputValue(tag);
    setSearchQuery(tag);
  };

  return (
    <>
      {/* ヘッダー */}
      <header className="relative w-full h-20 bg-white flex items-center justify-center">
        <div className="absolute left-4 top-1/2 -translate-y-1/2">
          <Image
            src="/icon/rumors_icon.svg"
            alt="rumorsロゴ"
            width={100}
            height={100}
            priority
          />
        </div>
        <div className="text-center">
          <h1 className="text-4xl font-bold pt-1 pb-1 mt-2 mb-1">
            横国 サーチる
          </h1>
          <p className="text-sm text-black-100 pt-1 pb-1 mt-1 mb-2">
            横国サークル検索サイト
          </p>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="w-full">
        {/* 検索エリア */}
        <search className="w-full bg-[#EEEEEE] flex flex-col items-center justify-center gap-2 py-4">
          {/* 検索フォーム */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <Image
              src="/icon/hamburger_menu_icon.svg"
              alt="ハンバーガーメニューロゴ"
              width={50}
              height={50}
              priority
              className="cursor-pointer"
            />
            <input
              type="text"
              name="search"
              placeholder="サーチる！"
              id="search-box"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-64 md:w-96 bg-[#868686] text-white placeholder-white px-3 py-1 outline-none"
            />
            <button
              type="submit"
              className="border border-black px-4 py-1 hover:bg-gray-200 transition-colors cursor-pointer"
            >
              検索
            </button>
          </form>
          {/* 人気タグ */}
          <div className="flex flex-row items-center justify-center gap-2 m-2">
            <p className="font-[1000] text-sm">人気検索＃タグ</p>
            <div className="flex flex-wrap justify-center gap-2">
              {POPULAR_TAGS.map((tag) => (
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
        </search>

        {/* サークル一覧 */}
        <section className="w-full bg-[#C0C0C0] py-2">
          {filteredCircles.length > 0 ? (
            filteredCircles.map((circle) => (
              <CircleCard
                key={circle.id}
                circle={circle}
                onTagClick={handleTagClick}
              />
            ))
          ) : (
            <p className="text-center py-10 text-gray-600 font-medium">
              該当するサークルが見つかりませんでした。
            </p>
          )}
        </section>
      </main>
    </>
  );
}
