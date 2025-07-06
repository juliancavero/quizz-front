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
  // Calculate score ranges
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
  return (
    <div
      className={`min-h-screen ${gradient} flex items-center justify-center p-4`}
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
      <div className="bg-white rounded-3xl shadow-2xl p-16 w-full max-w-6xl text-center animate-fade-in border-8 border-gradient-to-r from-indigo-400 to-purple-400">
        <div className="mb-12">
          <div className="text-gray-700 animate-fade-in">
            <div className="flex items-center justify-center mb-12">
              <span className="text-6xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                ¿Cuántas has acertado?
              </span>
            </div>

            {scoreRanges && scoreRanges.length > 0 ? (
              <div className="mb-8">
                <div className="grid gap-6 mb-8">
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

                    // Define different styles for each level
                    const getCardStyle = () => {
                      if (index === 0) {
                        // Low score - Red gradient
                        return "bg-gradient-to-r from-red-500 to-orange-500";
                      } else if (index === 1) {
                        // Medium score - Yellow/Orange gradient
                        return "bg-gradient-to-r from-yellow-500 to-orange-500";
                      } else {
                        // High score - Green gradient
                        return "bg-gradient-to-r from-green-500 to-emerald-500";
                      }
                    };

                    return (
                      <div
                        key={`score-range-${range.min}-${range.max}`}
                        className={`${getCardStyle()} rounded-2xl p-6 shadow-lg animate-fade-in-scale`}
                        style={{ animationDelay: `${index * 0.3}s` }}
                      >
                        <div className="flex items-center justify-between text-white">
                          <div className="flex-1 text-left">
                            <span className="text-2xl font-bold">
                              {getRangeText()}
                            </span>
                            <span className="text-lg ml-2">aciertos</span>
                          </div>
                          <div className="flex-1 text-right">
                            <span className="text-3xl font-black">
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

            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl p-8 shadow-lg">
              <p className="text-4xl font-bold text-white mb-6">
                Dínoslo en los comentarios
              </p>
              <div className="flex justify-center space-x-8">
                {/* Like Icon */}
                <div
                  className="flex flex-col items-center animate-fade-in-scale"
                  style={{ animationDelay: "1.2s" }}
                >
                  <svg
                    className="w-12 h-12 text-white mb-2"
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
                  <span className="text-white text-sm">Dale Like</span>
                </div>
                {/* Share Icon */}
                <div
                  className="flex flex-col items-center animate-fade-in-scale"
                  style={{ animationDelay: "1.5s" }}
                >
                  <svg
                    className="w-12 h-12 text-white mb-2"
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
                  <span className="text-white text-sm">Comparte</span>
                </div>
                {/* Comment Icon */}
                <div
                  className="flex flex-col items-center animate-fade-in-scale"
                  style={{ animationDelay: "1.8s" }}
                >
                  <svg
                    className="w-12 h-12 text-white mb-2"
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
                  <span className="text-white text-sm">Comenta</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinishedPhase;
