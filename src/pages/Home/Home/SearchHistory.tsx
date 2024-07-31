import { SetterOrUpdater } from "recoil";
import { ISearchHistory } from "../../../atoms";
import { NavigateFunction } from "react-router-dom";

interface SearchHistoryProps {
  nav: NavigateFunction;
  search: ISearchHistory[];
  setSearch: SetterOrUpdater<ISearchHistory[]>;
}

function SearchHistory({ nav, search, setSearch }: SearchHistoryProps) {
  //검색기록 검색버튼
  const onSearchClick = (fullName: string) => {
    nav(`/${fullName}/mostcyall`);
  };
  //검색기록 삭제버튼
  const onTrashClick = (fullName: string) => {
    setSearch((prev) => {
      const targetIndex = prev.findIndex((item) => item.fullName === fullName);
      return [...prev.slice(0, targetIndex), ...prev.slice(targetIndex + 1)];
    });
  };
  //검색기록 전부삭제버튼
  const onSearchAllDeleteClick = () => {
    setSearch([]);
  };
  return (
    <>
      <div className="flex justify-end py-3 space-x-2">
        <button
          onClick={onSearchAllDeleteClick}
          className="px-3 py-1 bg-slate-200 rounded-2xl"
        >
          검색기록 초기화
        </button>
      </div>
      <section className="flex flex-col">
        {search
          ? search?.map((name) => (
              <div
                key={name.fullName}
                className="flex items-center justify-between p-3 border-t-2 hover:bg-slate-200"
              >
                <button
                  key={name.fullName}
                  onClick={() => onSearchClick(name?.fullName)}
                  className="flex items-center "
                >
                  <div className="flex items-center justify-center w-8 h-8 mr-1 text-xl text-white rounded-full bg-slate-300">
                    <span>{name.firstName}</span>
                  </div>
                  <span>{name.fullName}</span>
                </button>
                <button onClick={() => onTrashClick(name?.fullName)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 text-slate-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </button>
              </div>
            ))
          : null}
      </section>
    </>
  );
}

export default SearchHistory;
