import { useNavigate } from "react-router-dom";
import {
  DetailItem,
  DetailMatchItem,
  DetailPlayerInfo,
  DetailPosition,
  getDetailItem,
} from "../../../../../api";
import {
  calculateAverageCS,
  cls,
  winningRate,
} from "../../../../../libs/utils";
import { ParyMember } from "../Matches";
import AttCards from "../../../../../components/playInfoCard/AttCards";
import ChampAndPositionCard from "../../../../../components/playInfoCard/ChampAndPositionCard";
import GameStats from "../../../../../components/playInfoCard/GameStats";
import PartyMember from "../../../../../components/playInfoCard/PartyMember";
import ItemCard from "../../../../../components/playInfoCard/ItemCard";
import { useQuery } from "react-query";

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
  const allCs = playInfo?.sentinelKillCount + playInfo?.demolisherKillCount;

  const nav = useNavigate();
  const onSearchClick = (nickname: string) => {
    nav(`/${nickname}/mostcyall`);
  };
  const csAverage = calculateAverageCS(
    playInfo?.sentinelKillCount,
    playInfo?.demolisherKillCount,
    playInfo?.playTime
  );
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
            <AttCards id={att.id} name={att.name} />
          ))}
        </div>
      </header>
      <main className="p-2 space-y-3">
        <section className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ChampAndPositionCard
              matchResult={matchResult}
              characterId={playInfo?.characterId}
              positionName={position?.name}
            />
            <figcaption
              onClick={() => onSearchClick(nickname)}
              className={cls(
                "text-sm text-slate-500 hover:ring hover:ring-offset-2 hover:cursor-pointer p-1 transition",
                matchResult === "win"
                  ? "hover:ring-blue-400"
                  : "hover:ring-red-400"
              )}
            >
              <span className="flex text-base font-semibold text-black">
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
          <GameStats playInfo={playInfo} />
        </section>
        <section className="flex items-center space-x-1 h-7">
          {partyMembers?.map((member) => (
            <PartyMember
              partyId={member.partyId}
              partyMember={member.partyMember}
              matchResult={matchResult}
            />
          ))}
        </section>
        <section className="grid grid-cols-8 gap-1 mx-10">
          {items?.map((item) => (
            <ItemCard
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
