import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useGetQuiz from "@/api/services/get/useGetQuiz";
import useAuth from "@/hooks/useAuth";
import { config } from "../../../config";

// Colección de gradientes
const gradients = [
  "bg-gradient-to-br from-teal-400 to-purple-900",
  "bg-gradient-to-br from-blue-500 to-red-600",
  "bg-gradient-to-br from-purple-500 to-pink-600",
  "bg-gradient-to-br from-green-500 to-red-600",
  "bg-gradient-to-br from-orange-500 to-purple-600",
  "bg-gradient-to-br from-yellow-500 to-orange-600",
  "bg-gradient-to-br from-pink-500 to-rose-600",
  "bg-gradient-to-br from-fuchsia-500 to-blue-600",
  "bg-gradient-to-br from-emerald-500 to-orange-600",
  "bg-gradient-to-br from-fuchsia-500 to-amber-600",
];

const useQuizzPage = () => {
  const { quizzId: quizId } = useParams<{ quizzId: string }>();
  const { accessToken, isAuthenticated, isLoggingIn } = useAuth();

  // Estado para el gradiente aleatorio
  const [randomGradient, setRandomGradient] = useState<string>("");

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [score, setScore] = useState(0);
  const [timerKey, setTimerKey] = useState(0);
  const [isAutoRunning, setIsAutoRunning] = useState(false);
  const [isQuestionVisible, setIsQuestionVisible] = useState(false);
  const [isAnswersVisible, setIsAnswersVisible] = useState(false);
  const [isImageVisible, setIsImageVisible] = useState(false);
  const [gamePhase, setGamePhase] = useState<
    "loading" | "countdown" | "playing" | "finished"
  >("loading");
  const [countdownNumber, setCountdownNumber] = useState(3);
  const [transitionProgress, setTransitionProgress] = useState(0);
  const [isTransitionProgressVisible, setIsTransitionProgressVisible] =
    useState(false);
  const [isAnswerHighlightActive, setIsAnswerHighlightActive] = useState(false);

  const {
    data: quiz,
    isLoading: isLoadingQuiz,
    error,
  } = useGetQuiz({
    quizId: quizId || "",
    accessToken: accessToken || "",
  });

  const isLoading = isLoggingIn || isLoadingQuiz;

  const currentQuestion = quiz?.preguntas[currentQuestionIndex];
  const totalQuestions = quiz?.preguntas.length || 0;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  // Efecto para seleccionar gradiente aleatorio al cargar la página
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * gradients.length);
    setRandomGradient(gradients[randomIndex]);
  }, []);

  // Auto-run effect: Start the auto-run when quiz is loaded
  useEffect(() => {
    if (quiz && !isLoading && gamePhase === "loading") {
      setGamePhase("countdown");
      startCountdown();
    }
  }, [quiz, isLoading, gamePhase]);

  // Efecto para el gradiente aleatorio
  useEffect(() => {
    // Función para seleccionar un gradiente aleatorio
    const selectRandomGradient = () => {
      const randomIndex = Math.floor(Math.random() * gradients.length);
      setRandomGradient(gradients[randomIndex]);
    };

    // Seleccionar un gradiente al azar al cargar el componente
    selectRandomGradient();
  }, []);

  // Countdown function
  const startCountdown = () => {
    setCountdownNumber(3);

    const countdown = setInterval(() => {
      setCountdownNumber((prev) => {
        if (prev <= 1) {
          clearInterval(countdown);
          setTimeout(() => {
            // Set initial state for playing phase
            setIsQuestionVisible(false);
            setIsAnswersVisible(false);
            setIsImageVisible(false);

            // Change to playing phase immediately
            setGamePhase("playing");
            setIsAutoRunning(true);

            // Start entrance animations for the first question with proper delays
            setTimeout(() => {
              setIsQuestionVisible(true);
            }, 300); // Increased delay for smoother transition
            setTimeout(() => {
              setIsImageVisible(true);
            }, 500); // Separate timing for image
            setTimeout(() => {
              setIsAnswersVisible(true);
            }, 600); // Increased delay for smoother transition
          }, 500); // Wait for "GO!" to be visible
          return 0;
        }
        return prev - 1;
      });
    }, 500); // Every 500ms (half second)
  };

  // Animation effect: Show question and answers with entrance animation for subsequent questions
  useEffect(() => {
    if (
      quiz &&
      !isLoading &&
      gamePhase === "playing" &&
      currentQuestionIndex > 0 &&
      !isTransitioning
    ) {
      // Only for subsequent questions (not the first one)
      // Small delay to ensure smooth entrance animation
      setTimeout(() => {
        setIsQuestionVisible(true);
      }, 100);

      // Image entrance animation
      setTimeout(() => {
        setIsImageVisible(true);
      }, 200);

      // Staggered entrance for answers
      setTimeout(() => {
        setIsAnswersVisible(true);
      }, 300);
    }
  }, [quiz, isLoading, gamePhase, currentQuestionIndex, isTransitioning]);

  const onTimerComplete = () => {
    if (selectedAnswer !== null || isTransitioning) return;

    // Timer completed - automatically select the correct answer
    const correctAnswerIndex = currentQuestion?.indiceRespuestaCorrecta;
    if (correctAnswerIndex !== undefined) {
      setSelectedAnswer(correctAnswerIndex);
      setIsAnswerCorrect(true);
      setScore(score + 1);
    }

    setIsTransitioning(true);
    setIsTransitionProgressVisible(true);
    setTransitionProgress(0);

    // Animate the transition progress bar
    const progressInterval = setInterval(() => {
      setTransitionProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 100 / (config.timeToReview * 10); // frames over timeToReview seconds (100ms per frame)
      });
    }, 100);

    setTimeout(() => {
      setIsTransitionProgressVisible(false);
      setTransitionProgress(0);

      if (isLastQuestion) {
        setGamePhase("finished");
      } else {
        // Start fade out animation
        setIsQuestionVisible(false);
        setIsImageVisible(false);
        setIsAnswersVisible(false);

        setTimeout(() => {
          // Reset all states for the new question immediately
          setCurrentQuestionIndex(currentQuestionIndex + 1);
          setSelectedAnswer(null);
          setIsAnswerCorrect(null);
          setIsTransitioning(false);
          setTimerKey(timerKey + 1); // Reset timer for next question
          setIsAnswerHighlightActive(false); // Reset highlight state

          // Start fade in animation for new question with staggered timing
          setTimeout(() => {
            setIsQuestionVisible(true);
          }, 100);

          setTimeout(() => {
            setIsImageVisible(true);
          }, 200);

          setTimeout(() => {
            setIsAnswersVisible(true);
          }, 300);
        }, 200); // Wait for fade out animation to complete
      }
    }, config.timeToReview * 1000);
  };

  const onTimerMidpoint = () => {
    // Only trigger highlight if no answer is selected and not transitioning
    if (selectedAnswer === null && !isTransitioning) {
      setIsAnswerHighlightActive(true);

      // Reset the highlight state after the animation completes
      setTimeout(() => {
        setIsAnswerHighlightActive(false);
      }, 800); // Shorter duration to avoid conflicts
    }
  };

  const handleAnswerClick = (answerIndex: number) => {
    // Disable manual clicks during auto-run mode
    if (isAutoRunning || selectedAnswer !== null || isTransitioning) return;

    setSelectedAnswer(answerIndex);
    const correct = answerIndex === currentQuestion?.indiceRespuestaCorrecta;
    setIsAnswerCorrect(correct);

    if (correct) {
      setScore(score + 1);
    }

    setIsTransitioning(true);
    setIsTransitionProgressVisible(true);
    setTransitionProgress(0);

    // Animate the transition progress bar
    const progressInterval = setInterval(() => {
      setTransitionProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 100 / (config.timeToReview * 10); // frames over timeToReview seconds (100ms per frame)
      });
    }, 100);

    setTimeout(() => {
      setIsTransitionProgressVisible(false);
      setTransitionProgress(0);

      if (isLastQuestion) {
        setGamePhase("finished");
      } else {
        // Start fade out animation
        setIsQuestionVisible(false);
        setIsImageVisible(false);
        setIsAnswersVisible(false);

        setTimeout(() => {
          // Reset all states for the new question immediately
          setCurrentQuestionIndex(currentQuestionIndex + 1);
          setSelectedAnswer(null);
          setIsAnswerCorrect(null);
          setIsTransitioning(false);
          setTimerKey(timerKey + 1); // Reset timer for next question
          setIsAnswerHighlightActive(false); // Reset highlight state

          // Start fade in animation for new question with staggered timing
          setTimeout(() => {
            setIsQuestionVisible(true);
          }, 100);

          setTimeout(() => {
            setIsImageVisible(true);
          }, 200);

          setTimeout(() => {
            setIsAnswersVisible(true);
          }, 300);
        }, 200); // Wait for fade out animation to complete
      }
    }, config.timeToReview * 1000);
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsAnswerCorrect(null);
    setIsTransitioning(false);
    setScore(0);
    setTimerKey(timerKey + 1); // Reset timer
    setGamePhase("countdown");
    setCountdownNumber(3);
    setTransitionProgress(0);
    setIsTransitionProgressVisible(false);
    setIsAnswerHighlightActive(false); // Reset highlight state

    // Reset animations to initial state
    setIsQuestionVisible(false);
    setIsAnswersVisible(false);
    setIsImageVisible(false);

    // Restart the countdown process
    startCountdown();
  };

  return {
    quiz,
    isLoading,
    error,
    quizId,
    isAuthenticated,
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
  };
};

export default useQuizzPage;
