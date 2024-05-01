import { DetailPlayer, DetailPlayerInfo } from "../../../../api";

interface IReportBar {
  text: string;
  winnerCount: DetailPlayer[];
  loserCount: DetailPlayer[];
  countName: keyof DetailPlayerInfo;
}

function ReportBar({ text, winnerCount, loserCount, countName }: IReportBar) {
  let winCountSum = 0;
  let loserCountSum = 0;
  //팀원들의 카운트들을 합산
  for (const winCount of winnerCount) {
    winCountSum += Number(winCount?.playInfo[countName]);
  }
  for (const loseCount of loserCount) {
    loserCountSum += Number(loseCount?.playInfo[countName]);
  }
  //두 숫자를 입력하면 합쳐서 100%라고 할 때 각각의 퍼센트 비율을 계산하는 함수
  const calculatePercentage = (num1: number, num2: number) => {
    const total = num1 + num2;
    const percent1 = ((num1 / total) * 100).toFixed(2);
    const percent2 = ((num2 / total) * 100).toFixed(2);
    return [
      [String(`${percent1}%`), percent1],
      [String(`${percent2}%`), percent2],
    ];
  };
  const winWidthLength = calculatePercentage(winCountSum, loserCountSum)[0];
  const loseWidthLength = calculatePercentage(winCountSum, loserCountSum)[1];
  return (
    <section>
      <span>{text}</span>
      <div className="flex w-full bg-green-300">
        <figure
          style={{ width: winWidthLength[0] }}
          className="flex p-1 space-x-1 transition bg-blue-300 hover:scale-110 min-w-20"
        >
          <span>
            {winCountSum}({winWidthLength[1]})%
          </span>
        </figure>
        <figure
          style={{ width: loseWidthLength[0] }}
          className="flex justify-end p-1 space-x-1 transition bg-red-300 hover:scale-105 min-w-20"
        >
          <span>
            {loserCountSum}({loseWidthLength[1]}% )
          </span>
        </figure>
      </div>
    </section>
  );
}

export default ReportBar;
