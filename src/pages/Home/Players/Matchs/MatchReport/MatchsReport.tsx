import { DetailPlayer } from "../../../../../api/cyphersApi";
import PositionImg from "../../../../../components/images/PositionImg";
import ReportBar from "./Component/ReportBar";

interface IMatchsReport {
  winners: DetailPlayer[];
  losers: DetailPlayer[];
}

function MatchsReport({ winners, losers }: IMatchsReport) {
  return (
    <main className="p-4 space-y-4 bg-white">
      <header className="space-y-4">
        <span className="text-2xl">리포트</span>
        <section className="flex flex-col items-end">
          <div className="flex items-center">
            <figure className="h-4 mr-1 bg-blue-300 aspect-square" />
            <figcaption className="text-sm">승리팀</figcaption>
          </div>
          <div className="flex items-center">
            <figure className="h-4 mr-1 bg-red-300 aspect-square" />
            <figcaption className="text-sm">패배팀</figcaption>
          </div>
        </section>
      </header>
      <section>
        <span>조합</span>
        <div className="flex w-full">
          <figure className="flex w-1/2 p-1 space-x-1 bg-blue-300">
            {winners.map((winner) => (
              <PositionImg
                key={winner.playerId}
                positionName={winner.position.name}
              />
            ))}
          </figure>
          <figure className="flex justify-end w-1/2 p-1 space-x-1 bg-red-300">
            {losers.map((loser) => (
              <PositionImg
                key={loser.playerId}
                positionName={loser.position.name}
              />
            ))}
          </figure>
        </div>
      </section>
      <ReportBar
        text="킬"
        winnerCount={winners}
        loserCount={losers}
        countName="killCount"
      />
      <ReportBar
        text="어시스트"
        winnerCount={winners}
        loserCount={losers}
        countName="assistCount"
      />
      <ReportBar
        text="입힌 피해량"
        winnerCount={winners}
        loserCount={losers}
        countName="attackPoint"
      />
      <ReportBar
        text="타워 데미지"
        winnerCount={winners}
        loserCount={losers}
        countName="towerAttackPoint"
      />
      <ReportBar
        text="시야"
        winnerCount={winners}
        loserCount={losers}
        countName="sightPoint"
      />
      <ReportBar
        text="전투참여"
        winnerCount={winners}
        loserCount={losers}
        countName="battlePoint"
      />
      <ReportBar
        text="CS"
        winnerCount={winners}
        loserCount={losers}
        countName="sentinelKillCount"
      />
      <ReportBar
        text="코인량"
        winnerCount={winners}
        loserCount={losers}
        countName="getCoin"
      />
      <ReportBar
        text="힐량"
        winnerCount={winners}
        loserCount={losers}
        countName="healAmount"
      />
      <ReportBar
        text="트루퍼 킬"
        winnerCount={winners}
        loserCount={losers}
        countName="trooperKillCount"
      />
    </main>
  );
}

export default MatchsReport;
