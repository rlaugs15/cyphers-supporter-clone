import Skeleton from "react-loading-skeleton";
import { partyInfo, PlayerInfo } from "../../../../../api/cyphersApi";
import MostChamp from "./MostChamp";
import { contentTitleStyle } from "../../../../../libs/utils";

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
  if (matshingData?.matches?.rows.length === 0) {
    return (
      <main className="flex items-center justify-center h-full">
        <div className="flex flex-col items-center justify-center">
          <span className={`${contentTitleStyle} font-semibold`}>
            모스트 정보를 표시할 수 없습니다
          </span>
          <p>플레이 데이터가 부족합니다</p>
        </div>
      </main>
    );
  }

  //파티유저의 닉네임과 플레이 횟수를 담은 배열을 새로 생성, 파티유저가 없을 경우 솔로플레이
  const { partyArray, namesArray } = (matshingData?.matches?.rows || []).reduce(
    (acc, item) => {
      if (!item.playInfo.partyInfo?.length) {
        acc.partyArray.push({
          result: item.playInfo.result,
          playerId: String(matshingData?.playerId),
          nickname: "솔로플레이",
          characterId: item.playInfo.characterId,
          characterName: item.playInfo.characterName,
        });
      } else {
        item.playInfo.partyInfo.forEach((partyItem) => {
          acc.partyArray.push(partyItem);
          acc.namesArray.add(partyItem.nickname); // Set으로 중복 제거
        });
      }
      return acc;
    },
    { partyArray: [] as partyInfo[], namesArray: new Set<string>() }
  );

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
