import { useEffect } from "react";
import { soundManager } from "../../../components/soundManager";

interface CountdownPhaseProps {
  title: string;
  countdownNumber: number;
  gradient: string;
  difficulty: "easy" | "medium" | "hard" | "impossible";
  difficultyText: string;
  questionImages: string[];
}

const CountdownPhase: React.FC<CountdownPhaseProps> = ({
  title,
  countdownNumber,
  gradient,
  difficulty,
  difficultyText,
  questionImages,
}) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-500 text-white";
      case "medium":
        return "bg-yellow-400 text-white";
      case "hard":
        return "bg-red-500 text-white";
      case "impossible":
        return "bg-purple-700 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const getCurrentImageData = () => {
    const imagesWithImages = questionImages.filter(
      (img) => img && img.trim() !== ""
    );
    if (imagesWithImages.length === 0) return null;

    let imageIndex = 0;

    switch (countdownNumber) {
      case 3:
        imageIndex = 0;
        break;
      case 2:
        imageIndex = 1;
        break;
      case 1:
        imageIndex = 2;
        break;
      case 0:
        imageIndex = 3;
        break;
    }

    const image = imagesWithImages[imageIndex % imagesWithImages.length];
    return { image };
  };

  const currentImageData = getCurrentImageData();

  useEffect(() => {
    if (countdownNumber > 0) {
      soundManager.playCountdown();
    } else {
      soundManager.playGameStart();
    }
  }, [countdownNumber]);

  return (
    <div
      className={`min-h-screen ${gradient} flex flex-col items-center justify-center px-4 py-6 relative`}
    >
      <span
        data-testid="start-quizz"
        // className="invisible absolute top-0 left-0"
      />

      {currentImageData && (
        <div className="w-full max-w-xs aspect-square rounded-2xl overflow-hidden shadow-xl border-4 border-white mb-6">
          <img
            key={`countdown-${countdownNumber}`}
            src={currentImageData.image}
            alt={`Imagen ${4 - countdownNumber}`}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-lg w-full max-w-xs text-center px-4 py-6">
        <h1 className="text-3xl font-black text-gray-900 leading-tight mb-6">
          {title}
        </h1>

        <div className="flex flex-col items-center gap-2 mb-4 w-full">
          <span className="text-lg text-gray-700 font-medium">Nivel</span>
          <span
            className={`w-full text-center text-lg px-4 py-2 rounded-3xl font-semibold ${getDifficultyColor(
              difficulty
            )}`}
          >
            {difficultyText}
          </span>
        </div>

        <div className="text-6xl font-extrabold text-indigo-600 animate-pulse">
          {countdownNumber > 0 ? (
            countdownNumber
          ) : (
            <span className="text-green-600">¡GO!</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default CountdownPhase;
