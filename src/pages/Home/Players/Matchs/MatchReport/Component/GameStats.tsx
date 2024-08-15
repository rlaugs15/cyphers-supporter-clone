import { DetailPlayerInfo } from "../../../../../../api/cyphersApi";

interface GameStatsProps {
  playInfo: DetailPlayerInfo;
}

function GameStats({ playInfo }: GameStatsProps) {
  //데미지 포인트 등을 1000으로 나누는 함수 ex) 12345 -> 12.3
  const diviByThousand = (num: number) => {
    return (num / 1000).toFixed(2);
  };

  return (
    <figcaption className="text-xs text-slate-500">
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
    </figcaption>
  );
}

export default GameStats;
