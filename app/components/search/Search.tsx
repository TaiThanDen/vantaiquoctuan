import { useState } from "react";

type NewsSearchProps = {
  onSearch: (keyword: string) => void;
};

const NewsSearch = ({ onSearch }: NewsSearchProps) => {
  const [keyword, setKeyword] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
    onSearch(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(keyword);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto mb-6 px-2"
    >
      <div className="relative">
        <input
          type="text"
          className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-base border border-slate-200 rounded-full pl-5 pr-32 py-4 transition duration-300 ease focus:outline-none focus:border-[#00aa64] hover:border-slate-300 shadow-sm focus:shadow font-montserrat"
          placeholder="Tìm kiếm tin tức..."
          value={keyword}
          onChange={handleChange}
        />
        <button
          className="absolute top-1 right-1 flex items-center justify-center rounded-full bg-[#00aa64] py-3 px-5 border border-transparent text-base text-white transition-all shadow-sm hover:bg-[#008f53] focus:bg-[#008f53] active:bg-[#008f53]"
          type="submit"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5 mr-1"
          >
            <path
              fillRule="evenodd"
              d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
              clipRule="evenodd"
            />
          </svg>
          Tìm kiếm
        </button>
      </div>
    </form>
  );
};

export default NewsSearch;
