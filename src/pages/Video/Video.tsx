import { contentBoxStyle } from "@/libs/utils";
import { Outlet } from "react-router-dom";
import VideoNavBar from "./Component/VideoNavBar";

function Video() {
  return (
    <>
      <div className={`${contentBoxStyle}`}>
        <VideoNavBar />
        <Outlet />
      </div>
    </>
  );
}

export default Video;
