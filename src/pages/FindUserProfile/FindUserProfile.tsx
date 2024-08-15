import { Outlet } from "react-router-dom";
import { contentBoxStyle } from "../../libs/utils";
import useUser from "../../hooks/useUser";

function FindUserProfile() {
  const {} = useUser("nonUserOnly");
  return (
    <div className={`${contentBoxStyle}`}>
      <Outlet />
    </div>
  );
}

export default FindUserProfile;
