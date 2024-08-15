import { IPlayerInfo } from "../../../../../api/cyphersApi";
import { winningRate } from "../../../../../libs/utils";
import AvatarImg from "../../../../../components/images/AvatarImg";

interface ImgOrRankAndRateProps {
  playerInfoData: IPlayerInfo;
  normal?: boolean;
}

function ImgOrRankAndRate({
  playerInfoData,
  normal = false,
}: ImgOrRankAndRateProps) {
  const rateCount = normal ? 1 : 0;
  return (
    <>
      <figure className="flex flex-col items-center justify-center">
        <span>{normal ? "일반전" : "공식전"}</span>
        {normal ? (
          <AvatarImg character id={playerInfoData?.represent?.characterId} />
        ) : (
          <div className="flex items-center justify-center w-16 h-16 bg-black rounded-full">
            <span className="flex items-center justify-center text-sm font-semibold text-white">
              {playerInfoData?.ratingPoint ? (
                <span className="text-center">{playerInfoData?.tierName}</span>
              ) : (
                "Unknown"
              )}
            </span>
          </div>
        )}
        <span>
          {playerInfoData?.records[rateCount]?.winCount ?? "0"}승
          {playerInfoData?.records[rateCount]?.loseCount ?? "0"}패
          {playerInfoData?.records[rateCount]?.stopCount ?? "0"}중단
        </span>
        <span>
          {playerInfoData?.records[rateCount]?.winCount
            ? winningRate(
                Number(playerInfoData?.records[rateCount]?.winCount),
                Number(playerInfoData?.records[rateCount]?.loseCount),
                Number(playerInfoData?.records[rateCount]?.stopCount)
              )
            : "-"}
          %
        </span>
        {normal ? null : (
          <span>{playerInfoData?.ratingPoint ?? "Unknown"}</span>
        )}
      </figure>
    </>
  );
}

export default ImgOrRankAndRate;
