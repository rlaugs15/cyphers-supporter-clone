import { cls, selectRarityColor } from "../../libs/utils";
import { useSetRecoilState } from "recoil";
import { itemDetailScreenAtom, itemIdAtom } from "../../atoms";
import { getItemImg } from "../../api/cyphersApi";

interface ItemImgProps {
  itemId: string;
  itemName: string;
  rarityName: string;
}

function ItemCard({ itemId, itemName, rarityName }: ItemImgProps) {
  const itemFirstName = rarityName.charAt(0);
  const setItemDetailScreen = useSetRecoilState(itemDetailScreenAtom);
  const setItemId = useSetRecoilState(itemIdAtom);
  const onItemDetailClick = () => {
    setItemDetailScreen(true);
    setItemId(itemId);
  };
  return (
    <div
      onClick={onItemDetailClick}
      className={cls(
        "relative flex items-center justify-center h-12 p-1 mb-2 group aspect-square",
        selectRarityColor(rarityName)
      )}
    >
      <figure
        style={{ backgroundImage: `url(${getItemImg(itemId)})` }}
        className="bg-cover h-11 aspect-square"
      />
      {itemFirstName === ("S" || "E") ? (
        <figcaption className="absolute flex items-center justify-center h-4 bg-pink-500 right-9 bottom-8 aspect-square">
          <span className="text-sm text-white">{itemFirstName}</span>
        </figcaption>
      ) : null}
      <span className="absolute z-10 p-1 text-xs text-white truncate opacity-0 group-hover:opacity-100 top-14 bg-slate-500">
        {itemName}
      </span>
    </div>
  );
}

export default ItemCard;
