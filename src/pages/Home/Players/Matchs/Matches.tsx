import { useQuery } from "react-query";
import { DetailMatchData, getDetailMatching } from "../../../../api";
import { useParams } from "react-router-dom";
import MatchsReport from "./MatchsReport";
import GameViewDetail from "./GameViewDeatil";

function Matches() {
  const { matchId } = useParams();

  const { isLoading: detailMatchingLoading, data: detailMatchingData } =
    useQuery<DetailMatchData>(["detailNatcing", matchId], () =>
      getDetailMatching(matchId + "")
    );
  console.log(detailMatchingData);

  return (
    <>
      {detailMatchingLoading ? (
        <span className="text-3xl font-semibold">로딩 중...</span>
      ) : (
        <div className="space-y-9">
          <GameViewDetail detailMatchingData={detailMatchingData!} />
          <MatchsReport detailMatchingData={detailMatchingData!} />
          <div className="bg-white">
            <span className="block px-3 py-4">플레이 정보</span>
            <main className="flex grid-cols-2 bg-green-300">
              <section className="grid w-full grid-cols-1">
                <article className="bg-blue-200">
                  <header className="flex items-center justify-between px-3 py-1 bg-blue-400">
                    <div className="flex flex-col font-semibold text-white">
                      <span>[2인 파티/선택]</span>
                      <span>윤이월</span>
                    </div>
                    <div className="space-x-2">
                      <span>탱</span>
                      <span>버프</span>
                      <span>버프</span>
                      <span>버프</span>
                    </div>
                  </header>
                  <main className="p-2 space-y-3">
                    <section className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <figure className="relative flex p-1 bg-blue-400 rounded-xl">
                          <div className="w-14 h-14 bg-slate-400 rounded-xl" />
                          <span className="absolute bg-green-300 bottom-11 right-12">
                            포
                          </span>
                        </figure>
                        <figcaption className="text-sm text-slate-500">
                          <span className="flex text-base text-black">
                            (Lv 51) 트리비아
                          </span>
                          <span>
                            <p className="text-blue-400">(KDA: 27.0)</p>3킬
                            0데스 24어시
                          </span>
                          <span className="flex">
                            <p className="text-blue-400">(분당 CS: 2.5)</p>CS:
                            39개
                          </span>
                        </figcaption>
                      </div>
                      <p className="text-xs text-slate-500">
                        <div>
                          <span>힐량:</span> <span>0</span>
                        </div>
                        <div>
                          <span>공격량:</span> <span> 34.0k</span>
                        </div>
                        <div>
                          <span>피해량:</span> <span> 4.0k</span>
                        </div>
                        <div>
                          <span>타워 공격량:</span> <span> 4.0k</span>
                        </div>
                        <div>
                          <span>획득 코인량:</span> <span> 4.0k</span>
                        </div>
                        <div>
                          <span>전투참여:</span> <span> 4.0k</span>
                        </div>
                        <div>
                          <span>시야:</span> <span>448</span>
                        </div>
                      </p>
                    </section>
                    <section className="flex items-center space-x-1">
                      <span className="flex items-center justify-center h-6 px-2 space-x-1 text-sm rounded-2xl bg-slate-100">
                        <p className="flex items-center justify-center w-6 text-xs rounded-full aspect-square bg-slate-300">
                          <span>파티</span>
                        </p>
                        <p>윤이월</p>
                      </span>
                      <span className="flex items-center justify-center h-6 px-2 space-x-1 text-sm text-white rounded-2xl bg-slate-600">
                        <p className="flex items-center justify-center w-6 text-xs bg-black rounded-full aspect-square">
                          <span>#</span>
                        </p>
                        <p>폭딜러</p>
                      </span>
                    </section>
                    <section className="grid grid-cols-8 gap-1 mx-10">
                      {...Array.from(Array(16).keys()).map((item) => (
                        <div
                          key={item}
                          className="relative flex items-center justify-center h-12 p-1 mb-2 bg-pink-500 aspect-square"
                        >
                          <figure className="bg-black h-11 aspect-square" />
                          <figcaption className="absolute flex items-center justify-center h-4 bg-pink-500 right-9 bottom-8 aspect-square">
                            <span className="text-sm text-white">S</span>
                          </figcaption>
                        </div>
                      ))}
                    </section>
                  </main>
                </article>
              </section>
              <section className="w-full grid-cols-1 bg-red-400">
                <article className="bg-red-200 ">
                  <header className="flex justify-between">
                    <div className="flex flex-col">
                      <span>[2인 파티/선택]</span>
                      <span>윤이월</span>
                    </div>
                    <div>
                      <span>탱</span>
                      <span>버프</span>
                      <span>버프</span>
                      <span>버프</span>
                    </div>
                  </header>
                </article>
              </section>
            </main>
          </div>
        </div>
      )}
    </>
  );
}

export default Matches;
