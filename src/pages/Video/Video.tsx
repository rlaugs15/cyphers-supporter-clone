import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { contentBoxStyle } from "@/libs/utils";
import { Outlet } from "react-router-dom";

function Video() {
  return (
    <div className={`${contentBoxStyle}`}>
      <Card className="flex flex-col-reverse items-center justify-center h-96">
        <CardHeader>
          <CardTitle>콘텐츠 준비 중입니다.</CardTitle>
          <CardDescription>빠른 시일 내에 찾아뵙겠습니다.</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center">
          <svg
            className="h-24 aspect-square"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 576 512"
          >
            <path d="M0 128C0 92.7 28.7 64 64 64l256 0c35.3 0 64 28.7 64 64l0 256c0 35.3-28.7 64-64 64L64 448c-35.3 0-64-28.7-64-64L0 128zM559.1 99.8c10.4 5.6 16.9 16.4 16.9 28.2l0 256c0 11.8-6.5 22.6-16.9 28.2s-23 5-32.9-1.6l-96-64L416 337.1l0-17.1 0-128 0-17.1 14.2-9.5 96-64c9.8-6.5 22.4-7.2 32.9-1.6z" />
          </svg>
        </CardContent>
      </Card>
    </div>
    <>
      <div className={`${contentBoxStyle}`}>
        <Outlet />
      </div>
    </>
  );
}

export default Video;
