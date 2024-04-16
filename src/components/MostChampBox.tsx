import { PlayerInfo } from "../api";
import MostChamp from "./MostChamp";

interface IMostChampBox {
  category: string;
  matshingData: PlayerInfo;
  matshingLoading: boolean;
}

function MostChampBox({
  category,
  matshingData,
  matshingLoading,
}: IMostChampBox) {
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
              모스트 사이퍼 ({category})
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

export default MostChampBox;
