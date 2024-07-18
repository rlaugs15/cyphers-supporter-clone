import { useQuery } from "react-query";
import {
  Link,
  Outlet,
  useMatch,
  useNavigate,
  useParams,
} from "react-router-dom";
import {
  IPlayer,
  IPlayerInfo,
  PlayerInfo,
  getMatching,
  getPlayer,
  getPlayerInfo,
} from "../../../api";
import { allMatchData, cls } from "../../../libs/utils";
import { useSetRecoilState } from "recoil";
import {
  allMatchingAtom,
  allMatshingLoadingAtom,
  normalMatchingAtom,
  normalMatshingLoadingAtom,
  ratingMatchingAtom,
  ratingMatshingLoadingAtom,
} from "../../../atoms";
import { useEffect } from "react";
import PlayerInfoCard from "../../../components/PlayerInfoCard";

function PlayerBasicInfo() {
  const { nickname } = useParams();
  const mostcyallMatch = useMatch("/:nickname/mostcyall");
  const mostcyratingMatch = useMatch("/:nickname/mostcyrating");
  const mostcynomalMatch = useMatch("/:nickname/mostcynomal");
  const { data: nicknameData } = useQuery<IPlayer>(
    ["playerNickname", nickname],
    () => getPlayer(nickname + "")
  );
  const { isLoading: playerInfoLoading, data: playerInfoData } =
    useQuery<IPlayerInfo>(["playerInfo", nicknameData], () =>
      getPlayerInfo(nicknameData?.rows[0].playerId + "")
    );
  //노말 매칭 데이터, 로딩
  const { isLoading: normalMatshingLoading, data: normalMatshingData } =
    useQuery<PlayerInfo>(["normalPlayeId", playerInfoData?.playerId], () =>
      getMatching(playerInfoData?.playerId + "", true)
    );
  const setNormalMatshingData = useSetRecoilState(normalMatchingAtom);
  const setNormalMatchingLoading = useSetRecoilState(normalMatshingLoadingAtom);
  setNormalMatshingData(normalMatshingData as PlayerInfo);
  setNormalMatchingLoading(normalMatshingLoading);
  //레이팅 매칭 데이터, 로딩
  const { isLoading: ratingMatshingLoading, data: ratingMatshingData } =
    useQuery<PlayerInfo>(["ratingPlayeId", playerInfoData?.playerId + ""], () =>
      getMatching(playerInfoData?.playerId + "")
    );
  const setRatingMatshingData = useSetRecoilState(ratingMatchingAtom);
  const setRatingMatchingLoading = useSetRecoilState(ratingMatshingLoadingAtom);
  setRatingMatshingData(ratingMatshingData as PlayerInfo);
  setRatingMatchingLoading(ratingMatshingLoading);
  //모든 매칭 데이터, 로딩
  const setAllLoading = useSetRecoilState(allMatshingLoadingAtom);
  const setAllMatchingData = useSetRecoilState(allMatchingAtom);

  const combinedData = allMatchData(
    normalMatshingLoading,
    ratingMatshingLoading,
    normalMatshingData!,
    ratingMatshingData!
  );
  const allMatchingLoading = normalMatshingLoading && ratingMatshingLoading;
  setAllLoading(allMatchingLoading);
  setAllMatchingData(combinedData);
  //검색 시 초기 하위 라우트를 mostcyall로 설정
  const nav = useNavigate();
  useEffect(() => {
    nav("mostcyall");
  }, [nickname]);
  return (
    <>
      <div className="flex items-center justify-between mb-7">
        <p className="text-2xl ">플레이어 기본 정보</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path
            fillRule="evenodd"
            d="M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903h-3.183a.75.75 0 1 0 0 1.5h4.992a.75.75 0 0 0 .75-.75V4.356a.75.75 0 0 0-1.5 0v3.18l-1.9-1.9A9 9 0 0 0 3.306 9.67a.75.75 0 1 0 1.45.388Zm15.408 3.352a.75.75 0 0 0-.919.53 7.5 7.5 0 0 1-12.548 3.364l-1.902-1.903h3.183a.75.75 0 0 0 0-1.5H2.984a.75.75 0 0 0-.75.75v4.992a.75.75 0 0 0 1.5 0v-3.18l1.9 1.9a9 9 0 0 0 15.059-4.035.75.75 0 0 0-.53-.918Z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <main className=" h-60">
        <PlayerInfoCard
          loading={playerInfoLoading}
          playerInfoData={playerInfoData!}
        />
      </main>
      <div className="h-[330px] bg-white">
        <div className="h-full">
          <div className="grid grid-cols-3">
            <Link
              to="mostcyall"
              className={cls(
                "text-center border-b-2",
                mostcyallMatch
                  ? "border-red-300 text-red-300"
                  : "border-slate-400"
              )}
            >
              전체
            </Link>
            <Link
              to="mostcyrating"
              className={cls(
                "text-center border-b-2",
                mostcyratingMatch
                  ? "border-red-300 text-red-300"
                  : "border-slate-400"
              )}
            >
              공식
            </Link>
            <Link
              to="mostcynomal"
              className={cls(
                "text-center border-b-2",
                mostcynomalMatch
                  ? "border-red-300 text-red-300"
                  : "border-slate-400"
              )}
            >
              일반
            </Link>
          </div>
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default PlayerBasicInfo;
