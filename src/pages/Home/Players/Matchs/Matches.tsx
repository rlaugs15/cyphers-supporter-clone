import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import MatchsReport from "./MatchReport/MatchsReport";
import GameViewDetail from "./GameViewDeatil";
import MatchPlayInfo from "./MatchPlayInfo.tsx/MatchPlayInfo";
import Skeleton from "react-loading-skeleton";
import {
  DetailMatchData,
  DetailPlayer,
  getDetailMatching,
} from "../../../../api/cyphersApi";

export interface ParyMember {
  partyId: string;
  partyMember: string;
}
interface IAddParyUser extends DetailPlayer {
  partyMembers: ParyMember[];
  matchResult: string;
}
interface IFilterTeams {
  filterWinner: DetailPlayer[];
  filterLoser: DetailPlayer[];
}

function Matches() {
  const { matchId } = useParams();

  const { isLoading: detailMatchingLoading, data: detailMatchingData } =
    useQuery<DetailMatchData>(["detailNatcing", matchId], () =>
      getDetailMatching(matchId + "")
    );
  //승자팀과 패자팀으로 분류하는 함수
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
  const filterTeams = selectPosiionFilter(detailMatchingData!);

  //filterTeams에 파티유저와 승패결과를 추가하는 함수
  const selectPartyUsers = (filterTeams: IFilterTeams) => {
    let addPartyWinner: IAddParyUser[] = [];
    let addPartyLoser: IAddParyUser[] = [];

    let partyUsers: ParyMember[] = [];

    //각각 유저의 id와 닉네임을 새로운 객체에 넣기
    for (const winner of filterTeams?.filterWinner) {
      partyUsers = [
        ...partyUsers,
        { partyId: winner.playInfo.partyId, partyMember: winner.nickname },
      ];
    }
    for (const loser of filterTeams?.filterLoser) {
      partyUsers = [
        ...partyUsers,
        { partyId: loser.playInfo.partyId, partyMember: loser.nickname },
      ];
    }

    //각각 유저의 객체에 파티맴버와 아이디 넣기
    //솔로의 파티 아이디는 "b762303013093c43599c55f64fdcff53"
    for (const winner of filterTeams?.filterWinner) {
      let newPartyUsers: ParyMember[] = []; // 각 winner마다 새로운 배열 초기화
      for (const partyUser of partyUsers) {
        if (
          winner.playInfo.partyId !== "b762303013093c43599c55f64fdcff53" &&
          winner.nickname !== partyUser.partyMember &&
          winner.playInfo.partyId === partyUser.partyId
        ) {
          newPartyUsers = [
            ...newPartyUsers,
            { partyId: partyUser.partyId, partyMember: partyUser.partyMember },
          ];
        }
      }
      addPartyWinner = [
        ...addPartyWinner,
        {
          ...winner,
          partyMembers: [...newPartyUsers],
          matchResult: "win",
        },
      ];
    }

    for (const loser of filterTeams?.filterLoser) {
      let newPartyUsers: ParyMember[] = []; // 각 loser마다 새로운 배열 초기화
      for (const partyUser of partyUsers) {
        if (
          loser.playInfo.partyId !== "b762303013093c43599c55f64fdcff53" &&
          loser.nickname !== partyUser.partyMember &&
          loser.playInfo.partyId === partyUser.partyId
        ) {
          newPartyUsers = [
            ...newPartyUsers,
            { partyId: partyUser.partyId, partyMember: partyUser.partyMember },
          ];
        }
      }
      addPartyLoser = [
        ...addPartyLoser,
        {
          ...loser,
          partyMembers: [...newPartyUsers],
          matchResult: "lose",
        },
      ];
    }

    return { addPartyWinner, addPartyLoser };
  };

  const addReultWinners = selectPartyUsers(filterTeams).addPartyWinner;
  const addReultLosers = selectPartyUsers(filterTeams).addPartyLoser;
  return (
    <>
      {detailMatchingLoading ? (
        <div className="space-y-9">
          <header className="p-4 space-y-10 bg-white">
            <Skeleton width={160} height={30} />
            <div className="flex flex-col">
              <Skeleton width={100} />
              <Skeleton width={200} />
              <Skeleton width={160} />
              <Skeleton width={140} />
            </div>
          </header>
          <main className="p-4 space-y-4 bg-white">
            <header className="space-y-4">
              <span className="text-2xl">리포트</span>
              <section className="flex flex-col items-end">
                <Skeleton width={40} />
                <Skeleton width={40} />
              </section>
            </header>

            {[...Array.from(Array(11).keys())].map((item) => (
              <section key={item}>
                <Skeleton width={40} height={20} />
                <Skeleton width={"100%"} height={30} />
              </section>
            ))}
          </main>
        </div>
      ) : (
        <div className="space-y-9">
          <GameViewDetail detailMatchingData={detailMatchingData!} />
          <MatchsReport
            winners={filterTeams?.filterWinner}
            losers={filterTeams?.filterLoser}
          />
          <div className="bg-white">
            <span className="block px-3 py-4 text-2xl">플레이 정보</span>
            <main className="flex grid-cols-2">
              <section className="grid w-full grid-cols-1">
                {addReultWinners?.map((winner) => (
                  <MatchPlayInfo
                    key={winner.playerId}
                    items={winner.items}
                    matchResult={winner.matchResult}
                    nickname={winner.nickname}
                    partyMembers={winner.partyMembers}
                    playInfo={winner.playInfo}
                    position={winner.position}
                  />
                ))}
              </section>
              <section className="w-full grid-cols-1 bg-red-400">
                {addReultLosers?.map((loser) => (
                  <MatchPlayInfo
                    key={loser.playerId}
                    items={loser.items}
                    matchResult={loser.matchResult}
                    nickname={loser.nickname}
                    partyMembers={loser.partyMembers}
                    playInfo={loser.playInfo}
                    position={loser.position}
                  />
                ))}
              </section>
            </main>
          </div>
        </div>
      )}
    </>
  );
}

export default Matches;
