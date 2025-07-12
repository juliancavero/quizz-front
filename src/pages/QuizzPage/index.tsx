import useQuizzPage from "./useQuizzPage";
import {
  LoadingPhase,
  ErrorPhase,
  QuizNotFoundPhase,
  CountdownPhase,
  FinishedPhase,
  PlayingPhase,
} from "./components";

const QuizzPage = () => {
  const {
    quiz,
    isLoading,
    error,
    quizId,
    //isAuthenticated,
    randomGradient,
    currentQuestion,
    currentQuestionIndex,
    totalQuestions,
    selectedAnswer,
    isAnswerCorrect,
    isTransitioning,
    score,
    handleAnswerClick,
    resetQuiz,
    timerKey,
    onTimerComplete,
    onTimerMidpoint,
    isAutoRunning,
    isQuestionVisible,
    isAnswersVisible,
    isImageVisible,
    gamePhase,
    countdownNumber,
    transitionProgress,
    isTransitionProgressVisible,
    isAnswerHighlightActive,
    isSoundEnabled,
    toggleSound,
    startQuizzAfterRecordingConfirmed,
  } = useQuizzPage();

  if (isLoading) {
    return <LoadingPhase gradient={randomGradient} />;
  }

  /* if (!isAuthenticated) {
    return <AuthErrorPhase gradient={randomGradient} />;
  } */

  if (error) {
    return (
      <ErrorPhase
        quizId={quizId ?? ""}
        onRetry={resetQuiz}
        gradient={randomGradient}
      />
    );
  }

  if (!quiz || !currentQuestion) {
    return <QuizNotFoundPhase gradient={randomGradient} />;
  }

  if (gamePhase === "waiting-for-input") {
    return (
      <div>
        <button
          onClick={startQuizzAfterRecordingConfirmed}
          data-testid="start-quizz-button"
        >
          Comenzar Quiz
        </button>
      </div>
    );
  }

  // Countdown Phase
  if (gamePhase === "countdown") {
    // Extract images from quiz questions, filtering out undefined and empty strings
    const questionImages =
      quiz?.preguntas
        ?.map((pregunta) => pregunta.imagen)
        .filter(
          (imagen): imagen is string =>
            imagen !== undefined && imagen.trim() !== ""
        ) || [];

    return (
      <CountdownPhase
        title={quiz.titulo}
        countdownNumber={countdownNumber}
        gradient={randomGradient}
        difficulty={quiz.difficulty}
        difficultyText={quiz.difficultyText}
        questionImages={questionImages}
      />
    );
  }

  // Finished Phase
  if (gamePhase === "finished") {
    return (
      <FinishedPhase
        gradient={randomGradient}
        scores={quiz.scores}
        totalQuestions={totalQuestions}
      />
    );
  }

  // Playing Phase - render quiz content when in playing phase
  if (gamePhase === "playing") {
    return (
      <PlayingPhase
        currentQuestion={currentQuestion}
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={totalQuestions}
        score={score}
        selectedAnswer={selectedAnswer}
        isAnswerCorrect={isAnswerCorrect}
        isTransitioning={isTransitioning}
        isAutoRunning={isAutoRunning}
        isQuestionVisible={isQuestionVisible}
        isAnswersVisible={isAnswersVisible}
        isImageVisible={isImageVisible}
        timerKey={timerKey}
        onAnswerClick={handleAnswerClick}
        onTimerComplete={onTimerComplete}
        onTimerMidpoint={onTimerMidpoint}
        transitionProgress={transitionProgress}
        isTransitionProgressVisible={isTransitionProgressVisible}
        isAnswerHighlightActive={isAnswerHighlightActive}
        gradient={randomGradient}
        onSoundToggle={toggleSound}
        isSoundEnabled={isSoundEnabled}
      />
    );
  }

  // Return null for any other state during playing phase
  return null;
};

export default QuizzPage;
