import { useSearchParams } from "react-router-dom";
import {
  IPlayer,
  IPlayerInfo,
  PlayerInfo,
  getMatching,
  getPlayer,
  getPlayerInfo,
} from "../../../../api";
import { useQuery } from "react-query";
import PlayerInfoCard from "../../../../components/PlayerInfoCard";
import { allMatchData } from "../../../../libs/utils";
import RecentGameCard from "./RecentGameCard";

function PlayersComparison() {
  const [searchParams] = useSearchParams();
  const player1 = searchParams.get("player1");
  const player2 = searchParams.get("player2");
  //닉네임 로딩
  const { isLoading: player1NicknameLoading, data: player1NicknameData } =
    useQuery<IPlayer>(["player1Nickname", player1], () =>
      getPlayer(player1 + "")
    );
  const { isLoading: player2NicknameLoading, data: player2NicknameData } =
    useQuery<IPlayer>(["player2Nickname", player2], () =>
      getPlayer(player2 + "")
    );
  //플레이어 정보 로딩
  const { isLoading: player1InfoLoading, data: player1InfoData } =
    useQuery<IPlayerInfo>(["player1Info", player1NicknameData], () =>
      getPlayerInfo(player1NicknameData?.rows[0].playerId + "")
    );
  const { isLoading: player2InfoLoading, data: player2InfoData } =
    useQuery<IPlayerInfo>(["player2Info", player2NicknameData], () =>
      getPlayerInfo(player2NicknameData?.rows[0].playerId + "")
    );
  //플레이어 일반전 매칭기록 로딩
  const { isLoading: player1NormalMatchLoading, data: player1NormalMatchData } =
    useQuery<PlayerInfo>(["player1Match", player1InfoData?.playerId], () =>
      getMatching(player1InfoData?.playerId + "", true)
    );
  const { isLoading: player2NormalMatchLoading, data: player2NormalMatchData } =
    useQuery<PlayerInfo>(["player2Match", player1InfoData?.playerId], () =>
      getMatching(player2InfoData?.playerId + "", true)
    );
  //플레이어 공식전 매칭기록 로딩
  const { isLoading: player1RatingMatchLoading, data: player1RatingMatchData } =
    useQuery<PlayerInfo>(["player1Match", player1InfoData?.playerId], () =>
      getMatching(player1InfoData?.playerId + "")
    );
  const { isLoading: player2RatingMatchLoading, data: player2RatingMatchData } =
    useQuery<PlayerInfo>(["player2Match", player1InfoData?.playerId], () =>
      getMatching(player2InfoData?.playerId + "")
    );
  //플레이어 모든 매칭기록 로딩
  const player1AllMatchData = allMatchData(
    player1NormalMatchLoading,
    player1RatingMatchLoading,
    player1NormalMatchData!,
    player1RatingMatchData!
  );
  const player2AllMatchData = allMatchData(
    player2NormalMatchLoading,
    player2RatingMatchLoading,
    player2NormalMatchData!,
    player2RatingMatchData!
  );
  const player1AllMatchLoading =
    player1NormalMatchLoading && player1RatingMatchLoading;
  const player2AllMatchLoading =
    player2NormalMatchLoading && player2RatingMatchLoading;
  return (
    <>
      <article className="p-4 bg-white">
        <section className="pb-4 border-b-2">
          <PlayerInfoCard
            loading={player1InfoLoading}
            playerInfoData={player1InfoData!}
          />
        </section>
        <RecentGameCard
          playerMatchData={player1AllMatchData!}
          playerAllMatchLoading={player1AllMatchLoading}
        />
      </article>
      <article className="p-4 bg-white">
        <section className="pb-4 border-b-2">
          <PlayerInfoCard
            loading={player2InfoLoading}
            playerInfoData={player2InfoData!}
          />
        </section>
        <RecentGameCard
          playerMatchData={player2AllMatchData!}
          playerAllMatchLoading={player2AllMatchLoading}
        />
      </article>
    </>
  );
}

export default PlayersComparison;
