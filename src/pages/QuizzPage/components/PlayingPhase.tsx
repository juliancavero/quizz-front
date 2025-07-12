import { useEffect } from "react";
import Timer from "./Timer";
import { soundManager } from "../../../components/soundManager";

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
  onSoundToggle?: () => void;
  isSoundEnabled?: boolean;
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

  useEffect(() => {
    if (selectedAnswer !== null && isAnswerCorrect !== null) {
      if (isAnswerCorrect) {
        soundManager.playCorrectAnswer();
      } else {
        soundManager.playWrongAnswer();
      }
    }
  }, [selectedAnswer, isAnswerCorrect]);

  return (
    <div
      className={`min-h-screen ${gradient} flex items-center justify-center p-2`}
    >
      <div className="bg-white rounded-2xl shadow-2xl p-4 w-full max-w-sm sm:max-w-md md:max-w-xl max-h-[calc(100vh-1rem)] overflow-y-auto relative animate-fade-in">
        {/* Progress */}
        <div className="flex flex-col gap-3 mb-4 p-2 bg-gray-100 rounded-xl border">
          <div className="w-full h-2 bg-gray-300 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-300 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <div className="flex justify-between items-center text-base font-semibold text-gray-700">
            <div className="flex items-center gap-2">
              <span>🏆</span>
              {score}/{totalQuestions}
            </div>
            {isAutoRunning && selectedAnswer === null && (
              <Timer
                key={timerKey}
                onComplete={onTimerComplete}
                onMidpoint={onTimerMidpoint}
              />
            )}
          </div>
        </div>

        {/* Question */}
        <div className="mb-6">
          <h2
            className={`text-2xl font-bold text-gray-900 text-center mb-4 leading-snug ${
              isQuestionVisible
                ? "animate-fade-in opacity-100"
                : "opacity-0 invisible"
            }`}
          >
            {currentQuestion.texto}
          </h2>

          {currentQuestion.imagen && (
            <div className="flex justify-center mb-4">
              <img
                key={`image-${currentQuestion._id}`}
                src={currentQuestion.imagen}
                alt="Imagen de la pregunta"
                className={`w-full max-w-[250px] h-auto rounded-xl shadow-lg transition-all duration-500 ${
                  isImageVisible
                    ? "animate-slide-in-up opacity-100"
                    : "opacity-0 invisible"
                }`}
              />
            </div>
          )}

          {/* Answers */}
          <div
            className={`space-y-3 ${
              isAnswersVisible
                ? "animate-fade-in opacity-100"
                : "opacity-0 invisible"
            }`}
          >
            {currentQuestion.respuestas.map(
              (respuesta: string, index: number) => {
                let buttonClasses =
                  "w-full p-4 text-left rounded-xl border-2 font-semibold transition-all duration-300 flex items-center justify-between text-base text-lg sm:text-lg md:text-xl transform";

                const staggerClass = `animate-stagger-${index + 1}`;

                if (selectedAnswer === index) {
                  if (isAnswerCorrect === true) {
                    buttonClasses +=
                      " bg-green-500 border-green-500 text-white shadow-md animate-scale-up";
                  } else if (isAnswerCorrect === false) {
                    buttonClasses +=
                      " bg-red-500 border-red-500 text-white shadow-md animate-pulse";
                  }
                } else {
                  buttonClasses +=
                    " bg-white border-gray-200 text-gray-800 hover:border-indigo-400 hover:bg-indigo-50 active:scale-95";

                  if (isAnswersVisible) {
                    buttonClasses += ` animate-slide-in-left ${staggerClass}`;
                  }

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
                    <span className="break-words">{respuesta}</span>
                    <span className="text-xl ml-2">
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
          <div className="mt-4 w-full animate-fade-in">
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
