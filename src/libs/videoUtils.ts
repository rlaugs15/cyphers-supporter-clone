//주어진 날짜로부터 현재 시간까지의 경과 시간을 상대적으로 표현하는 함수
export const formatRelativeTime = (date: string | Date): string => {
  const uploadedDate = new Date(date);
  const now = new Date();
  const elapsed = now.getTime() - uploadedDate.getTime(); // 경과 시간 (밀리초)
  const seconds = Math.floor(elapsed / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30); // 대략적인 값
  const years = Math.floor(days / 365); // 대략적인 값

  if (years > 0) {
    return `${years}년 전`;
  } else if (months > 0) {
    return `${months}달 전`;
  } else if (days > 0) {
    return `${days}일 전`;
  } else if (hours > 0) {
    return `${hours}시간 전`;
  } else if (minutes > 0) {
    return `${minutes}분 전`;
  } else {
    return `방금 전`;
  }
};

//비디오의 시간을 0:00 형식으로 변환
export const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  seconds = Math.floor(seconds % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};
