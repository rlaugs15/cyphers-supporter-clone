import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { IPlayer, IPlayerInfo, getPlayer, getPlayerInfo } from "../../api";
import { calculateTier, makeImagePath, winningRate } from "../../libs/utils";

function PlayerBasicInfo() {
  const { nickname } = useParams();
  const { isLoading: nicknameLoading, data: nicknameData } = useQuery<IPlayer>(
    ["playeNickname", nickname],
    () => getPlayer(nickname + "")
  );
  console.log("nicknameData", nicknameData);
  const { isLoading: playerInfoLoading, data: playerInfoData } =
    useQuery<IPlayerInfo>(["playerInfo", nicknameData], () =>
      getPlayerInfo(nicknameData?.rows[0].playerId + "")
    );
  console.log("playerInfoData", playerInfoData);

  return (
    <>
      {playerInfoLoading ? (
        <div className="flex items-center justify-center w-full h-full">
          <div className="text-5xl font-semibold">로딩 중...</div>
        </div>
      ) : (
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
            <div className="flex flex-col items-center justify-center">
              <span className="text-2xl font-semibold">
                {playerInfoData?.nickname ?? "Unknown"}
              </span>
              <span className="text-sm">
                {playerInfoData?.clanName ?? "Unknown"}
              </span>
              <span className="mt-2 text-slate-400">
                {playerInfoData?.grade ?? "0"}
              </span>
            </div>
            <article className="grid grid-cols-2">
              <figure className="flex flex-col items-center justify-center">
                <span>공식전</span>
                <div className="flex items-center justify-center w-16 h-16 bg-black rounded-full">
                  <span className="text-sm font-semibold text-white">
                    {playerInfoData?.ratingPoint
                      ? calculateTier(Number(playerInfoData?.ratingPoint))
                      : "Unknown"}
                  </span>
                </div>
                <span>
                  {playerInfoData?.records[0]?.winCount ?? "0"}승
                  {playerInfoData?.records[0]?.loseCount ?? "0"}패
                  {playerInfoData?.records[0]?.stopCount ?? "0"}중단
                </span>
                <span>
                  {playerInfoData?.records[0]?.winCount
                    ? winningRate(
                        Number(playerInfoData?.records[0]?.winCount),
                        Number(playerInfoData?.records[0]?.loseCount),
                        Number(playerInfoData?.records[0]?.stopCount)
                      )
                    : "-"}
                  %
                </span>
                <span>{playerInfoData?.ratingPoint ?? "Unknown"}</span>
              </figure>
              <figure className="flex flex-col items-center justify-center">
                <span>일반전</span>
                <div
                  style={{
                    backgroundImage: `url(${makeImagePath(
                      playerInfoData?.represent?.characterId + ""
                    )})`,
                  }}
                  className="w-16 h-16 bg-blue-200 rounded-full"
                />
                <span>
                  {playerInfoData?.records[1]?.winCount ?? "0"}승
                  {playerInfoData?.records[1]?.loseCount ?? "0"}패
                  {playerInfoData?.records[1]?.stopCount ?? "0"}중단
                </span>
                <span>
                  {playerInfoData?.records[1]?.winCount
                    ? winningRate(
                        Number(playerInfoData?.records[1]?.winCount),
                        Number(playerInfoData?.records[1]?.loseCount),
                        Number(playerInfoData?.records[1]?.stopCount)
                      )
                    : "-"}
                  %
                </span>
              </figure>
            </article>
          </main>
        </>
      )}
    </>
  );
}

export default PlayerBasicInfo;
