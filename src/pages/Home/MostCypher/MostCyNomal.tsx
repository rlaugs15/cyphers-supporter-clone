import { useQuery } from "react-query";
import { PlayerInfo, getMatching } from "../../../api";
import { useRecoilValue } from "recoil";
import { playerIdAtom } from "../../../atoms";
import MostChamp from "../../../components/MostChamp";

function MostCyNomal() {
  const playerId = useRecoilValue(playerIdAtom);
  const { isLoading: matshingLoading, data: matshingData } =
    useQuery<PlayerInfo>(["playeId", playerId], () =>
      getMatching(playerId, true)
    );

  return (
    <>
      {matshingLoading ? (
        <div className="flex items-center justify-center w-full h-full">
          <span className="text-4xl font-semibold">로딩 중...</span>
        </div>
      ) : (
        <main className="grid grid-cols-3">
          <section className="col-span-2 p-2">
            <header className="my-4 text-2xl font-medium">
              모스트 사이퍼 (일반)
            </header>
            <article className="flex flex-col items-center justify-between bg-green-300">
              <span>플레이 횟수</span>
              <MostChamp
                data={matshingData?.matches?.rows!}
                loading={matshingLoading}
              />
              <MostChamp
                data={
                  matshingData?.matches?.rows! // 첫 번째 MostChamp에 표시된 캐릭터 제외
                }
                loading={matshingLoading}
                findSecond
                secondColor
              />
            </article>
          </section>
          <section>hi</section>
        </main>
      )}
    </>
  );
}

export default MostCyNomal;
