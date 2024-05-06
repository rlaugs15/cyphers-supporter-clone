import { getItemImg } from "../api";
import { cls } from "../libs/utils";

interface ItemImgProps {
  itemId: string;
  itemName: string;
  rarityName: string;
}

function ItemImg({ itemId, itemName, rarityName }: ItemImgProps) {
  const selectRarityColor = (rarityName: string) => {
    let itemColor = "";
    if (rarityName === "유니크") {
      itemColor = "bg-pink-500";
    } else if (rarityName === "레어") {
      itemColor = "bg-purple-500";
    } else if (rarityName === "언커먼") {
      itemColor = "bg-blue-500";
    } else if (rarityName === "커먼") {
      itemColor = "bg-white";
    }
    return itemColor;
  };
  const itemFirstName = rarityName.charAt(0);
  return (
    <div
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

export default ItemImg;
