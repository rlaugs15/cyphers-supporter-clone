import { useNavigate } from "react-router-dom";
import { cls } from "../../libs/utils";

interface PartyMemberProps {
  partyId: string;
  partyMember: string;
  matchResult: string;
}

function PartyMember({ partyId, partyMember, matchResult }: PartyMemberProps) {
  const nav = useNavigate();
  const onSearchClick = (nickname: string) => {
    nav(`/${nickname}/mostcyall`);
  };
  return (
    <span
      key={partyId}
      onClick={() => onSearchClick(partyMember)}
      className={cls(
        "flex items-center justify-center h-6 px-2 space-x-1 text-sm rounded-2xl bg-slate-100 hover:ring hover:ring-offset-2 hover:cursor-pointer transition",
        matchResult === "win" ? "hover:ring-blue-400" : "hover:ring-red-400"
      )}
    >
      <p className="flex items-center justify-center w-6 text-xs rounded-full aspect-square bg-slate-300">
        <span>파티</span>
      </p>
      <p>{partyMember}</p>
    </span>
  );
}

export default PartyMember;
