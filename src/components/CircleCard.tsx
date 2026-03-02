import Image from "next/image";
import type { Circle } from "@/types/circle";

type Props = {
  circle: Circle;
  onTagClick: (tag: string) => void;
};

export default function CircleCard({ circle, onTagClick }: Props) {
  return (
    <div className="relative w-4/5 min-h-[110px] bg-white border border-black mx-auto my-5 flex items-center">
      {/* サークルアイコン */}
      <div className="relative shrink-0 ml-2.5 w-[100px] h-[100px]">
        <Image
          src={circle.iconUrl}
          alt={`${circle.name}のアイコン`}
          fill
          className="object-cover"
          unoptimized
        />
      </div>

      {/* テキスト・タグ・URL エリア */}
      <div className="ml-5 flex flex-col gap-1 py-2">
        <p className="font-bold text-sm">{circle.name}</p>
        {circle.description && (
          <p className="text-xs text-gray-600">{circle.description}</p>
        )}

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
  );
}
