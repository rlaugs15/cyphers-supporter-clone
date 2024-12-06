import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { useRecoilState } from "recoil";
import { noticeStateAtom } from "@/atoms";
import { useEffect, useState } from "react";

function NoticeDrawer() {
  const [isNoticeOpen, setIsNoticeOpen] = useRecoilState(noticeStateAtom);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (isNoticeOpen) {
      setOpen(true);
      setIsNoticeOpen(false);
    }
  }, [isNoticeOpen]);

  return (
    <section>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button variant="default" className="w-full">
            공지사항
          </Button>
        </DrawerTrigger>
        <DrawerContent className="items-center">
          <DrawerHeader>
            <DrawerTitle className="text-2xl">공지사항</DrawerTitle>
          </DrawerHeader>

          <div className="flex flex-col gap-4">
            <DrawerTitle>매칭 데이터 관련(일반) 오류</DrawerTitle>
            <DrawerDescription>
              사이퍼즈 오픈 API의 매칭 데이터(일반)API 응답 모델이 변경되어 현재
              수정 중입니다.
              <br /> 일부 기능의 이용이 제한될 수 있습니다.
            </DrawerDescription>
            <DrawerTitle>동영상 컨텐츠 준비 중</DrawerTitle>
            <DrawerDescription>
              현재 해당 컨텐츠가 준비 중입니다. 조금만 기다려 주세요.
            </DrawerDescription>
          </div>

          {/* 드로어 하단에 액션 버튼 */}
          <DrawerFooter>
            <DrawerClose asChild>
              <Button className="w-28 btn-secondary" onClick={handleClose}>
                닫기
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </section>
  );
}

export default NoticeDrawer;
