import { useRecoilValue, useSetRecoilState } from "recoil";
import { itemDetailScreenAtom, itemIdAtom } from "../atoms";
import { DetailItem, getDetailItem, getItemImg } from "../api";
import { useQuery } from "react-query";
import React, { useEffect } from "react";
import { selectRarityColor } from "../libs/utils";
import Skeleton from "react-loading-skeleton";

/* interface ItemDetailScreenProps {
  detailItemingLoading: boolean;
  detailItemingData: DetailItem;
} */

function ItemDetailScreen() {
  const itemId = useRecoilValue(itemIdAtom);
  const setItemDetailScreen = useSetRecoilState(itemDetailScreenAtom);

  const { isLoading: detailItemingLoading, data: detailItemingData } =
    useQuery<DetailItem>(["detailItem", itemId], () =>
      getDetailItem(itemId + "")
    );

  const onDeleteItemScreen = () => {
    setItemDetailScreen(false);
  };
  //버블링을 막아서 아이템 화면을 눌러도 화면이 꺼지지 않게 함
  const onDeleteCancel = (event: { stopPropagation: () => void }) => {
    event.stopPropagation();
  };
  //'\n'은 리액트에서 줄바꿈되지 않는다. <br>태그로 바꿔야 한다
  const enterExplainDetail = detailItemingData?.explainDetail
    .split("\n")
    .map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));

  //esc 키를 눌러도 onDeleteItemScreen가 발동
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.keyCode === 27) {
        onDeleteItemScreen();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const textColor = selectRarityColor(detailItemingData?.rarityName + "", true);

  return (
    <div
      onClick={onDeleteItemScreen}
      className="fixed top-0 right-0 flex items-center justify-center w-screen h-screen m-0 bg-black bg-opacity-35"
    >
      <article
        onClick={onDeleteCancel}
        className="z-30 bg-white w-[903px] h-[456px] flex flex-col p-4 text-slate-600"
      >
        <section className="overflow-auto min-h-96">
          {detailItemingLoading ? (
            <>
              <div className="flex items-center mb-20 space-x-2">
                <Skeleton width={64} height={64} />
                <Skeleton width={160} height={28} />
              </div>
              <figcaption className="flex flex-col items-start space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i}>
                    <Skeleton width={120} />
                    <Skeleton width={92} />
                    <Skeleton width={200} />
                    <Skeleton width={160} />
                    <Skeleton width={180} />
                  </div>
                ))}
              </figcaption>
            </>
          ) : (
            <>
              <div className="flex items-center mb-10 space-x-2">
                <figure
                  style={{ backgroundImage: `url(${getItemImg(itemId)})` }}
                  className="w-16 bg-black aspect-square"
                />
                <figcaption
                  style={{ color: textColor }}
                  className="text-xl font-semibold"
                >
                  {detailItemingData?.itemName}
                </figcaption>
              </div>
              <figcaption>{enterExplainDetail}</figcaption>
            </>
          )}
        </section>
        <span className="flex items-end justify-end h-14">
          <button
            onClick={onDeleteItemScreen}
            className="px-3 py-1 transition rounded-md hover:bg-slate-400"
          >
            닫기
          </button>
        </span>
      </article>
    </div>
  );
}

export default ItemDetailScreen;
