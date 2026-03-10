export const Footer = () => {
  return (
    <footer className="relative w-full h-full bg-[#C0C0C0] flex items-center justify-center">
      <div className="text-center">
        <p className="text-xl mt-1 mb-1 md:text-2xl text-[#696969]">
          問い合わせに関しては、以下のメールアドレスまでご連絡ください。
        </p>
        <p className="text-xl mt-1 mb-1 md:text-2xl text-[#696969]">
          Email: rumorsynu@gmail.com
        </p>
        <p className="text-xs md:text-sm text-black-100 mt-1 mb-2 text-[#696969]">
          タグに関しては生成AIを使用しているため、実際のサークルの情報とは異なる場合があります。
        </p>
      </div>
    </footer>
  );
};
