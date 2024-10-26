import Skeleton from "react-loading-skeleton";
import MostChamp from "./MostChamp";
import { partyInfo, PlayerInfo } from "../../../../../api/cyphersApi";

interface IParty {
  partyUser: string;
  partyCount: number;
}
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
  //파티유저의 닉네임과 플레이 횟수를 담은 배열을 새로 생성, 파티유저가 없을 경우 솔로플레이
  let namesArray: string[] = [];
  let partyArray: partyInfo[] = [];

  matshingData?.matches?.rows.map((item) => {
    if (item.playInfo.partyInfo?.length === 0) {
      partyArray = [
        ...partyArray,
        {
          result: item.playInfo.result,
          playerId: matshingData.playerId,
          nickname: "솔로플레이",
          characterId: item.playInfo.characterId,
          characterName: item.playInfo.characterName,
        },
      ];
    }
    item.playInfo.partyInfo.map((item) => {
      partyArray = [...partyArray, item];
      namesArray = [...namesArray, item.nickname];
    });
  });

  const nameArray = ["솔로플레이", ...new Set(namesArray)];
  let partyMatchingCount: IParty[] = [];

  for (const name of nameArray) {
    let num = 0;
    for (const party of partyArray) {
      if (name === party.nickname) {
        num += 1;
      }
    }
    partyMatchingCount = [
      ...partyMatchingCount,
      { partyUser: name, partyCount: num },
    ];
  }

  if (!matshingLoading && !matshingData) {
    return (
      <main className="flex h-full grid-cols-3">
        <span>전적이 존재하지 않습니다.</span>
      </main>
    );
  }
  return (
    <main className="grid h-full grid-cols-3">
      <section className="col-span-2 p-2">
        <header className="my-4 text-2xl font-medium">
          모스트 사이퍼 ({category})
        </header>
        <article className="flex flex-col items-center justify-between">
          <span className="w-full p-2 text-lg font-semibold">플레이 횟수</span>
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
      <section className="border-l">
        <header className="p-2 text-xl font-semibold text-center">
          함께 플레이한 유저
        </header>
        <article className="overflow-x-hidden text-sm h-[260px]">
          {matshingLoading &&
            [...Array.from(Array(5).keys())].map((item) => (
              <div
                key={item}
                className="flex items-center justify-between px-5 py-3 border-b"
              >
                <Skeleton width={50} height={20} />
                <Skeleton width={100} height={20} />
              </div>
            ))}
          {!matshingLoading &&
            partyMatchingCount.map((partyMatch) => (
              <section
                key={partyMatch.partyUser}
                className="flex items-center justify-between px-5 py-3 border-b"
              >
                <span>{partyMatch?.partyUser}</span>
                <div className="flex flex-col">
                  <span>{partyMatch?.partyCount}회 플레이</span>
                </div>
              </section>
            ))}
        </article>
      </section>
    </main>
  );
}

export default MostChampBox;
