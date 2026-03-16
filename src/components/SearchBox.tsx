"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

type Props = {
  Value: string;
  onSearch: (query: string) => void; // 親に検索クエリを渡すためのコールバック
};

export const SearchBox = ({ Value, onSearch }: Props) => {
  // --- State ---
  const [inputValue, setInputValue] = useState(Value); // 入力値を管理

  // --- 外部のValueが更新された場合のみinputValueを更新 ---
  useEffect(() => {
    setInputValue(Value);
  }, [Value]);

  // --- 検索フォーム送信 ---
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // フォーム送信のデフォルト動作を防ぐ
    onSearch(inputValue); // 入力値を検索クエリとして親に渡す
  };

  return (
    <search className="w-full bg-[#EEEEEE] flex flex-col items-center justify-center gap-2 py-4">
      {/* 検索フォーム */}
      <form onSubmit={handleSearch} className="flex gap-2">
        {/* <Image
          src="/icon/hamburger_menu_icon.svg"
          alt="ハンバーガーメニューロゴ"
          width={50}
          height={50}
          priority
          className="cursor-pointer"
        /> */}
        <input
          type="text"
          name="search"
          placeholder="サーチる！"
          id="search-box"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-64 md:w-96 rounded-2xl bg-[#868686] text-white placeholder-white px-3 py-1 outline-none"
        />
        <button
          type="submit"
          className="border border-black rounded-2xl px-4 py-1 mr-1 hover:bg-gray-200 transition-colors cursor-pointer"
        >
          検索
        </button>
      </form>
    </search>
  );
};
