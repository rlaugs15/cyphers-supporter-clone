import { useEffect, useState } from "react";
import {
  cls,
  findMostChamp,
  findSecondMostChamp,
  scoreAverage,
  winningRate,
} from "../../../../../libs/utils";
import Skeleton from "react-loading-skeleton";
import { makeImagePath, MatchRecord } from "../../../../../api/cyphersApi";

interface IMostChamp {
  data: MatchRecord[];
  loading: boolean;
  findSecond?: boolean;
  secondColor?: boolean;
}

function MostChamp({ data, loading, findSecond, secondColor }: IMostChamp) {
  //const [champLoading, setChampLoading] = useState(false);
  const [mostChampArray, setMostChampArray] = useState([] as MatchRecord[]);
  useEffect(() => {
    //setChampLoading(true);
    if (!loading && data) {
      const mostChamp = findSecond
        ? findSecondMostChamp(data ?? [])
        : findMostChamp(data ?? []);
      const newArray = data?.filter(
        (item) => item?.playInfo?.characterName === mostChamp
      );
      setMostChampArray(() => [...newArray]);
      //setChampLoading(false);
    }
  }, [loading, data, findSecond]);

  if (loading) {
    return (
      <div className="flex items-center justify-between w-full p-1">
        <div className="flex space-x-1">
          <Skeleton width={64} height={64} circle />
          <figcaption className="flex flex-col">
            <Skeleton width={50} height={18} />
            <Skeleton width={150} />
            <Skeleton width={200} />
          </figcaption>
        </div>
      </div>
    );
  }

  return (
    <>
      <figure
        className={cls(
          "flex items-center justify-between w-full p-1",
          secondColor ? "bg-blue-200" : "bg-yellow-200"
        )}
      >
        <div className="flex space-x-1">
          <div
            style={{
              backgroundImage: mostChampArray[0]?.playInfo?.characterId
                ? `url(${makeImagePath(
                    mostChampArray[0]?.playInfo?.characterId
                  )})`
                : undefined,
            }}
            className="w-16 h-16 bg-black rounded-full"
          />

          <figcaption className="flex flex-col">
            <span className="text-sm font-semibold">
              {mostChampArray[0]?.playInfo?.characterName ?? "unknown"}
            </span>
            <span className="text-xs">
              {mostChampArray?.length ?? "-"}전{" "}
              {mostChampArray?.filter(
                (item) => item?.playInfo?.result === "win"
              )?.length ?? "-"}
              승{" "}
              {mostChampArray?.filter(
                (item) => item?.playInfo?.result === "lose"
              )?.length ?? "-"}
              패 (승률:{" "}
              {winningRate(
                mostChampArray?.filter(
                  (item) => item?.playInfo?.result === "win"
                )?.length,
                mostChampArray?.filter(
                  (item) => item?.playInfo?.result === "lose"
                )?.length,
                mostChampArray?.filter(
                  (item) => item?.playInfo?.result === "stop"
                )?.length
              )}
              %)
            </span>
            <span className="text-xs">
              {scoreAverage(mostChampArray, "killCount").toFixed(1)}킬{" "}
              {scoreAverage(mostChampArray, "deathCount").toFixed(1)}데스{" "}
              {scoreAverage(mostChampArray, "assistCount").toFixed(1)}
              어시스트 (KDA:{" "}
              {(
                (scoreAverage(mostChampArray, "killCount") +
                  scoreAverage(mostChampArray, "assistCount")) /
                scoreAverage(mostChampArray, "deathCount")
              ).toFixed(2)}
              점)
            </span>
          </figcaption>
        </div>
        <figcaption className="text-sm font-semibold">
          플레이 횟수: {mostChampArray?.length}회
        </figcaption>
      </figure>
    </>
  );
}

export default MostChamp;
