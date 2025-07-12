import { useEffect } from "react";
import { soundManager } from "../../../components/soundManager";

interface FinishedPhaseProps {
  gradient: string;
  scores?: string[];
  totalQuestions: number;
}

const FinishedPhase: React.FC<FinishedPhaseProps> = ({
  gradient,
  scores,
  totalQuestions,
}) => {
  const calculateScoreRanges = () => {
    if (!scores || scores.length === 0) return null;

    const firstRangeMax = Math.floor(totalQuestions * 0.5);
    const secondRangeMax = Math.floor(totalQuestions * 0.8);

    const ranges = [
      { min: 0, max: firstRangeMax, label: scores[0] || "" },
      { min: firstRangeMax + 1, max: secondRangeMax, label: scores[1] || "" },
      { min: secondRangeMax + 1, max: totalQuestions, label: scores[2] || "" },
    ];

    return ranges.filter((range) => range.label);
  };

  const scoreRanges = calculateScoreRanges();

  useEffect(() => {
    soundManager.playGameFinish();
  }, []);

  return (
    <div
      className={`min-h-screen ${gradient} flex items-center justify-center px-2 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-6 md:py-12 lg:py-16`}
    >
      <style>{`
        @keyframes fade-in-scale {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          50% {
            opacity: 1;
            transform: scale(1.15);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in-scale {
          animation: fade-in-scale 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
      <div className="bg-white rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-2xl p-6 sm:p-8 md:p-12 lg:p-16 max-w-lg text-center animate-fade-in border-4 sm:border-6 lg:border-8 border-gradient-to-r from-indigo-400 to-purple-400">
        <div className="mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          <div className="text-gray-700 animate-fade-in">
            <div className="flex items-center justify-center mb-8 sm:mb-10 md:mb-12 lg:mb-16">
              <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent leading-tight">
                ¿Cuántas has acertado?
              </span>
            </div>

            {scoreRanges && scoreRanges.length > 0 ? (
              <div className="mb-8 sm:mb-10">
                <div className="grid gap-4 sm:gap-5 md:gap-6 mb-8 sm:mb-10">
                  {scoreRanges.map((range, index) => {
                    const getRangeText = () => {
                      if (range.min === range.max) {
                        return `${range.min}`;
                      }
                      if (range.min === 0) {
                        return `${range.max} o menos`;
                      }
                      if (range.max === totalQuestions) {
                        return `+${range.min - 1}`;
                      }
                      return `${range.min} - ${range.max}`;
                    };

                    const getCardStyle = () => {
                      if (index === 0) {
                        return "bg-gradient-to-r from-red-500 to-orange-500";
                      } else if (index === 1) {
                        return "bg-gradient-to-r from-yellow-500 to-orange-500";
                      } else {
                        return "bg-gradient-to-r from-green-500 to-emerald-500";
                      }
                    };

                    return (
                      <div
                        key={`score-range-${range.min}-${range.max}`}
                        className={`${getCardStyle()} rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg animate-fade-in-scale`}
                        style={{ animationDelay: `${index * 0.3}s` }}
                      >
                        <div className="flex items-center justify-between text-white">
                          <div className="flex items-center space-x-3">
                            <span className="text-xl sm:text-2xl md:text-3xl font-bold">
                              {getRangeText()}
                            </span>
                            <span className="text-base sm:text-lg md:text-xl">
                              aciertos
                            </span>
                          </div>
                          <div className="flex-shrink-0">
                            <span className="text-2xl sm:text-3xl md:text-4xl font-black">
                              {range.label}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : null}

            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10 shadow-lg">
              <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
                Dínoslo en los comentarios
              </p>
              <div className="flex justify-center space-x-6 sm:space-x-8 md:space-x-10">
                <div
                  className="flex flex-col items-center animate-fade-in-scale"
                  style={{ animationDelay: "1.2s" }}
                >
                  <svg
                    className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-white mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  <span className="text-white text-sm sm:text-base">
                    Dale Like
                  </span>
                </div>
                <div
                  className="flex flex-col items-center animate-fade-in-scale"
                  style={{ animationDelay: "1.5s" }}
                >
                  <svg
                    className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-white mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                    />
                  </svg>
                  <span className="text-white text-sm sm:text-base">
                    Comparte
                  </span>
                </div>
                <div
                  className="flex flex-col items-center animate-fade-in-scale"
                  style={{ animationDelay: "1.8s" }}
                >
                  <svg
                    className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-white mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                  <span className="text-white text-sm sm:text-base">
                    Comenta
                  </span>
                </div>
                <span
                  data-testid="end-quizz"
                  className="invisible absolute top-0 left-0"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinishedPhase;
