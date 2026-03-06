import Image from "next/image";

export const Header = () => {
  return (
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
  );
};
