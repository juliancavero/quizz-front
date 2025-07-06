import Timer from "./Timer";

interface PlayingPhaseProps {
  currentQuestion: {
    _id: string;
    texto: string;
    imagen?: string;
    respuestas: string[];
    indiceRespuestaCorrecta: number;
  };
  currentQuestionIndex: number;
  totalQuestions: number;
  score: number;
  selectedAnswer: number | null;
  isAnswerCorrect: boolean | null;
  isTransitioning: boolean;
  isAutoRunning: boolean;
  isQuestionVisible: boolean;
  isAnswersVisible: boolean;
  isImageVisible: boolean;
  timerKey: number;
  transitionProgress: number;
  isTransitionProgressVisible: boolean;
  gradient: string;
  isAnswerHighlightActive: boolean;
  onAnswerClick: (answerIndex: number) => void;
  onTimerComplete: () => void;
  onTimerMidpoint: () => void;
}

const PlayingPhase: React.FC<PlayingPhaseProps> = ({
  currentQuestion,
  currentQuestionIndex,
  totalQuestions,
  score,
  selectedAnswer,
  isAnswerCorrect,
  isTransitioning,
  isAutoRunning,
  isQuestionVisible,
  isAnswersVisible,
  isImageVisible,
  timerKey,
  transitionProgress,
  isTransitionProgressVisible,
  gradient,
  isAnswerHighlightActive,
  onAnswerClick,
  onTimerComplete,
  onTimerMidpoint,
}) => {
  const progressPercentage =
    ((currentQuestionIndex + 1) / totalQuestions) * 100;

  return (
    <div
      className={`min-h-screen ${gradient} flex items-center justify-center p-6`}
    >
      <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-4xl max-h-[calc(100vh-3rem)] overflow-y-auto relative animate-fade-in">
        {/* Progress */}
        <div className="flex items-center justify-between mb-8 p-4 bg-gray-50 rounded-xl border animate-slide-in-up">
          <div className="flex-1 mx-6 h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-300 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <div className="text-lg font-semibold text-gray-600 flex items-center gap-2">
            <span>🏆</span>
            {score}/{totalQuestions}
          </div>
          {/* Timer - positioned in the same row as progress */}
          {isAutoRunning && selectedAnswer === null && (
            <div className="ml-4">
              <Timer
                key={timerKey}
                onComplete={onTimerComplete}
                onMidpoint={onTimerMidpoint}
              />
            </div>
          )}
        </div>

        {/* Question */}
        <div className="mb-10">
          <h2
            className={`text-4xl font-bold text-gray-800 text-center mb-8 transition-all duration-500 ${
              isQuestionVisible
                ? "animate-fade-in opacity-100"
                : "opacity-0 invisible"
            }`}
          >
            {currentQuestion.texto}
          </h2>

          {currentQuestion.imagen && (
            <img
              key={`image-${currentQuestion._id}`}
              src={currentQuestion.imagen}
              alt="Imagen de la pregunta"
              className={`w-full max-w-sm h-auto rounded-lg mx-auto mb-8 shadow-lg transition-all duration-500 animate-subtle-scale-pulse ${
                isImageVisible
                  ? "animate-slide-in-up opacity-100"
                  : "opacity-0 invisible"
              }`}
            />
          )}

          {/* Answers */}
          <div
            className={`space-y-3 transition-all duration-500 ${
              isAnswersVisible
                ? "animate-fade-in opacity-100"
                : "opacity-0 invisible"
            }`}
          >
            {currentQuestion.respuestas.map(
              (respuesta: string, index: number) => {
                let buttonClasses =
                  "w-full p-8 text-left rounded-xl border-2 font-semibold transition-all duration-300 flex items-center justify-between text-2xl transform ";

                // Add staggered animation for each answer
                const staggerClass = `animate-stagger-${index + 1}`;

                if (selectedAnswer === index) {
                  if (isAnswerCorrect === true) {
                    buttonClasses +=
                      "bg-green-500 border-green-500 text-white shadow-lg animate-scale-up";
                  } else if (isAnswerCorrect === false) {
                    buttonClasses +=
                      "bg-red-500 border-red-500 text-white shadow-lg animate-pulse";
                  }
                } else {
                  // Base classes for unselected answers
                  buttonClasses += `bg-white border-gray-200 text-gray-700 hover:border-indigo-400 hover:bg-indigo-50 active:scale-95`;

                  // Add entrance animation only when answers are becoming visible
                  if (isAnswersVisible) {
                    buttonClasses += ` animate-slide-in-left ${staggerClass}`;
                  } else {
                    buttonClasses += ` opacity-0 invisible`;
                  }

                  // Add highlight classes using pseudo-element to avoid conflicts
                  if (isAnswerHighlightActive && selectedAnswer === null) {
                    buttonClasses += ` answer-highlight-active highlight-delay-${index} relative`;
                  }
                }

                return (
                  <button
                    key={`answer-${currentQuestion._id}-${index}`}
                    className={buttonClasses}
                    onClick={() => onAnswerClick(index)}
                    disabled={
                      selectedAnswer !== null ||
                      isTransitioning ||
                      isAutoRunning
                    }
                  >
                    <span>{respuesta}</span>
                    <span className="text-2xl">
                      {selectedAnswer === index &&
                        isAnswerCorrect === true &&
                        "✓"}
                      {selectedAnswer === index &&
                        isAnswerCorrect === false &&
                        "✗"}
                    </span>
                  </button>
                );
              }
            )}
          </div>
        </div>

        {/* Transition Progress Bar */}
        {isTransitionProgressVisible && (
          <div className="mt-6 w-full animate-fade-in">
            <div className="w-full bg-gray-200 rounded-full h-1 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-100 ease-out"
                style={{ width: `${transitionProgress}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayingPhase;
