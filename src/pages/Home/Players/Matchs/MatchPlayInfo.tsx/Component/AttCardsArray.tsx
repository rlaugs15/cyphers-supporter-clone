import { getPositionImg } from "../../../../../../api/cyphersApi";

interface AttCardsProps {
  id: string;
  name: string;
}

function AttCards({ id, name }: AttCardsProps) {
  return (
    <article key={id} className="relative group">
      <figure
        style={{ backgroundImage: `url(${getPositionImg(id)})` }}
        className="w-10 bg-cover rounded-full aspect-square"
      />
      <figcaption className="absolute p-1 text-sm text-white truncate rounded-sm opacity-0 bg-slate-500 group-hover:opacity-100">
        {name}
      </figcaption>
    </article>
  );
}

export default AttCards;
