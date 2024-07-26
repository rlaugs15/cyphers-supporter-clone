import { contentBoxStyle, cls, playPosition } from "../../../libs/utils";

function PositionStats() {
  return (
    <div>
      <header className="p-3 bg-white">
        <div className="flex justify-start">
          <span className="text-2xl">포지션 통계</span>
        </div>
      </header>
      <section className={`grid grid-cols-3 gap-9 ${contentBoxStyle}`}>
        {[...Array.from(Array(3).keys())].map((num) => (
          <article key={num} className="flex flex-col items-center bg-red-300">
            <figcaption className="flex flex-col bg-blue-300">
              <span className="text-xl font-semibold">1위: 원거리딜러</span>
              <span className="text-sm text-slate-400">
                승률 25.29% (87회 플레이)
              </span>
            </figcaption>
            <div className="flex items-center justify-between w-full p-4">
              <figure
                className={cls(
                  `w-7 aspect-square rounded-full flex justify-center items-center ${
                    playPosition("서포터")?.positionColor
                  }`
                )}
              >
                <span>{playPosition("서포터")?.positionName}</span>
              </figure>
              <figure
                style={{ transform: "rotate(45deg)" }}
                className="w-10 bg-green-300 aspect-square"
              />
              <figure
                style={{ transform: "rotate(45deg)" }}
                className="w-8 bg-green-300 aspect-square"
              />
              <figure
                style={{ transform: "rotate(45deg)" }}
                className="w-8 bg-green-300 aspect-square"
              />
              <figure
                style={{ transform: "rotate(45deg)" }}
                className="w-10 bg-green-300 aspect-square"
              />
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

export default PositionStats;
