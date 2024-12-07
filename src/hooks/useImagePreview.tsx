import { useState, useEffect } from "react";

function useImagePreview(initialImageUrl: string = "") {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(initialImageUrl);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
    } else {
      //이미지가 이미 있을 때 이미지를 새로 선택 안 할 경우 취소
      setImageFile(null); // 메모리 해제
      setImagePreview(initialImageUrl);
    }
  };

  //이미지 미리보기
  useEffect(() => {
    if (imageFile) {
      const url = URL.createObjectURL(imageFile);
      setImagePreview(url);

      // 미리보기가 있을 때만 클린업 함수로 메모리 해제
      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [imageFile, initialImageUrl]);

  return { imageFile, imagePreview, handleFileChange };
}

export default useImagePreview;

/* 이미지 파일을 업로드하고, 미리 보기를 간단히 구현하는 훅 */

/* 인자
 초기 이미지 URL */

/* 반환값
imageFile: 업로드된 이미지 파일 객체
imagePreview: 미리 보기 이미지 URL
handleFileChange: 파일 선택 이벤트 핸들러 */
