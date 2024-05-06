import {
  DetailMatchItem,
  DetailPlayerInfo,
  DetailPosition,
  getPositionImg,
  makeImagePath,
} from "../../../../../api";
import ItemImg from "../../../../../components/ItemImg";
import { cls, playPosition, winningRate } from "../../../../../libs/utils";
import { ParyMember } from "../Matches";

interface MatchPlayInfoProps {
  items: DetailMatchItem[];
  matchResult: string;
  nickname: string;
  partyMembers: ParyMember[];
  playInfo: DetailPlayerInfo;
  position: DetailPosition;
}
/*

*/
function MatchPlayInfo({
  items,
  matchResult,
  nickname,
  partyMembers,
  playInfo,
  position,
}: MatchPlayInfoProps) {
  //분당 cs 평균 계산
  const calculateAverageCS = (
    sentinelKillCount: number,
    demolisherKillCount: number,
    playTime: number
  ) => {
    // 총 CS를 계산합니다.
    const totalCS = sentinelKillCount + demolisherKillCount;

    // 분 단위로 시간을 변환합니다.
    const minutes = playTime / 60;

    // 분당 CS를 계산합니다.
    const csPerMinute = totalCS / minutes;

    // 결과를 반환합니다.
    return csPerMinute.toFixed(1);
  };
  //데미지 포인트 등을 1000으로 나누는 함수 ex) 12345 -> 12.3
  const diviByThousand = (num: number) => {
    return (num / 1000).toFixed(2);
  };
  const csAverage = calculateAverageCS(
    playInfo?.sentinelKillCount,
    playInfo?.demolisherKillCount,
    playInfo?.playTime
  );
  const allCs = playInfo?.sentinelKillCount + playInfo?.demolisherKillCount;
  return (
    <article
      className={cls(matchResult === "win" ? "bg-blue-200" : "bg-red-200")}
    >
      <header
        className={cls(
          "flex items-center justify-between px-3 py-1",
          matchResult === "win" ? "bg-blue-400" : "bg-red-400"
        )}
      >
        <div className="flex flex-col font-semibold text-white">
          <span>
            [
            {partyMembers.length >= 1
              ? `${partyMembers.length + 1}인 파티`
              : "솔로"}
            /{playInfo?.random ? "랜덤" : "선택"}]
          </span>
          <span>{nickname}</span>
        </div>
        <div className="flex space-x-2">
          {position?.attribute.map((att) => (
            <article key={att.id} className="relative group">
              <figure
                style={{ backgroundImage: `url(${getPositionImg(att.id)})` }}
                className="w-10 bg-cover rounded-full aspect-square"
              />
              <figcaption className="absolute p-1 text-sm text-white truncate rounded-sm opacity-0 bg-slate-500 group-hover:opacity-100">
                {att.name}
              </figcaption>
            </article>
          ))}
        </div>
      </header>
      <main className="p-2 space-y-3">
        <section className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <figure
              className={cls(
                "relative flex p-1 rounded-xl",
                matchResult === "win" ? "bg-blue-400" : "bg-red-400"
              )}
            >
              <div
                style={{
                  backgroundImage: `url(${makeImagePath(
                    playInfo?.characterId
                  )})`,
                }}
                className="w-14 h-14 bg-slate-400 rounded-xl"
              />
              <span
                className={cls(
                  "absolute bottom-11 right-11 rounded-md px-1 font-semibold",
                  playPosition(position?.name)?.positionColor + ""
                )}
              >
                {playPosition(position?.name)?.positionName}
              </span>
            </figure>
            <figcaption className="text-sm text-slate-500">
              <span className="flex text-base text-black">
                (Lv {playInfo?.level}) {playInfo?.characterName}
              </span>
              <span className="flex">
                <p
                  className={cls(
                    matchResult === "win" ? "text-blue-400" : "text-red-400"
                  )}
                >
                  (KDA:{" "}
                  {winningRate(
                    playInfo?.killCount,
                    playInfo?.deathCount,
                    playInfo?.assistCount
                  )}
                  )
                </p>
                {playInfo?.killCount}킬 {playInfo?.deathCount}데스
                {playInfo?.assistCount}어시
              </span>
              <span className="flex">
                <p
                  className={cls(
                    matchResult === "win" ? "text-blue-400" : "text-red-400"
                  )}
                >
                  (분당 CS: {csAverage})
                </p>
                CS: {allCs}개
              </span>
            </figcaption>
          </div>
          <p className="text-xs text-slate-500">
            <div>
              <span>힐량:</span> <span>{playInfo?.healAmount}</span>
            </div>
            <div>
              <span>공격량:</span>{" "}
              <span> {diviByThousand(playInfo?.attackPoint)}k</span>
            </div>
            <div>
              <span>피해량:</span>{" "}
              <span> {diviByThousand(playInfo?.damagePoint)}k</span>
            </div>
            <div>
              <span>타워 공격량:</span>{" "}
              <span> {diviByThousand(playInfo?.towerAttackPoint)}k</span>
            </div>
            <div>
              <span>획득 코인량:</span>{" "}
              <span> {diviByThousand(playInfo?.getCoin)}k</span>
            </div>
            <div>
              <span>전투참여:</span> <span>{playInfo?.battlePoint}</span>
            </div>
            <div>
              <span>시야:</span> <span>{playInfo?.sightPoint}</span>
            </div>
          </p>
        </section>
        <section className="flex items-center space-x-1">
          {partyMembers?.map((member) => (
            <span
              key={member.partyId}
              className="flex items-center justify-center h-6 px-2 space-x-1 text-sm rounded-2xl bg-slate-100"
            >
              <p className="flex items-center justify-center w-6 text-xs rounded-full aspect-square bg-slate-300">
                <span>파티</span>
              </p>
              <p>{member.partyMember}</p>
            </span>
          ))}
        </section>
        <section className="grid grid-cols-8 gap-1 mx-10">
          {items?.map((item) => (
            <ItemImg
              itemId={item.itemId}
              itemName={item.itemName}
              rarityName={item.rarityName}
            />
          ))}
        </section>
      </main>
    </article>
  );
}

export default MatchPlayInfo;
