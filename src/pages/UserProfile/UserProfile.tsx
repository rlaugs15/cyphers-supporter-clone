import { Outlet } from "react-router-dom";
import { contentBoxStyle } from "../../libs/utils";
import useUser from "../../hooks/useUser";

function UserProfile() {
  const {} = useUser("userOnly");
  return (
    <div className={`${contentBoxStyle}`}>
      <Outlet />
    </div>
  );
}

export default UserProfile;
