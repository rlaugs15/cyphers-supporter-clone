import { DetailMatchData, DetailPlayer } from "../../../../api";
import PositionImg from "../../../../components/PositionImg";
import ReportBar from "./ReportBar";

interface IMatchsReport {
  detailMatchingData: DetailMatchData;
}

function MatchsReport({ detailMatchingData }: IMatchsReport) {
  //승자팀과 패자팁으로 분류하는 함수
  const selectPosiionFilter = (detailMatchingData: DetailMatchData) => {
    const winners =
      detailMatchingData?.teams?.find((team) => team.result === "win")
        ?.players || [];
    const losers =
      detailMatchingData?.teams?.find((team) => team.result === "lose")
        ?.players || [];

    const winnerPlayerId = [...winners];
    const loserPlayerId = [...losers];

    let filterWinner: DetailPlayer[] = [];
    let filterLoser: DetailPlayer[] = [];

    for (const winner of winnerPlayerId) {
      for (const player of detailMatchingData?.players!) {
        if (winner === player.playerId) {
          filterWinner = [...filterWinner, player];
        }
      }
    }

    for (const winner of loserPlayerId) {
      for (const player of detailMatchingData?.players!) {
        if (winner === player.playerId) {
          filterLoser = [...filterLoser, player];
        }
      }
    }
    return {
      filterWinner,
      filterLoser,
    };
  };
  const filterTeams = selectPosiionFilter(detailMatchingData);
  console.log(filterTeams);
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
            {filterTeams.filterWinner.map((winner) => (
              <PositionImg positionName={winner.position.name} />
            ))}
          </figure>
          <figure className="flex justify-end w-1/2 p-1 space-x-1 bg-red-300">
            {filterTeams.filterLoser.map((loser) => (
              <PositionImg positionName={loser.position.name} />
            ))}
          </figure>
        </div>
      </section>
      <ReportBar
        text="킬"
        winnerCount={filterTeams?.filterWinner}
        loserCount={filterTeams?.filterLoser}
        countName="killCount"
      />
      <ReportBar
        text="어시스트"
        winnerCount={filterTeams?.filterWinner}
        loserCount={filterTeams?.filterLoser}
        countName="assistCount"
      />
      <ReportBar
        text="입힌 피해량"
        winnerCount={filterTeams?.filterWinner}
        loserCount={filterTeams?.filterLoser}
        countName="attackPoint"
      />
      <ReportBar
        text="타워 데미지"
        winnerCount={filterTeams?.filterWinner}
        loserCount={filterTeams?.filterLoser}
        countName="towerAttackPoint"
      />
      <ReportBar
        text="시야"
        winnerCount={filterTeams?.filterWinner}
        loserCount={filterTeams?.filterLoser}
        countName="sightPoint"
      />
      <ReportBar
        text="전투참여"
        winnerCount={filterTeams?.filterWinner}
        loserCount={filterTeams?.filterLoser}
        countName="battlePoint"
      />
      <ReportBar
        text="CS"
        winnerCount={filterTeams?.filterWinner}
        loserCount={filterTeams?.filterLoser}
        countName="sentinelKillCount"
      />
      <ReportBar
        text="코인량"
        winnerCount={filterTeams?.filterWinner}
        loserCount={filterTeams?.filterLoser}
        countName="getCoin"
      />
      <ReportBar
        text="힐량"
        winnerCount={filterTeams?.filterWinner}
        loserCount={filterTeams?.filterLoser}
        countName="healAmount"
      />
      <ReportBar
        text="트루퍼 킬"
        winnerCount={filterTeams?.filterWinner}
        loserCount={filterTeams?.filterLoser}
        countName="trooperKillCount"
      />
    </main>
  );
}

export default MatchsReport;
