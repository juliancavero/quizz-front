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
  // Función para obtener el color de la etiqueta de dificultad
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-500 text-white";
      case "medium":
        return "bg-yellow-500 text-white";
      case "hard":
        return "bg-red-500 text-white";
      case "impossible":
        return "bg-purple-600 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };
  // Function to get current image and size based on countdown
  const getCurrentImageData = () => {
    const imagesWithImages = questionImages.filter(
      (img) => img && img.trim() !== ""
    );
    if (imagesWithImages.length === 0) return null;

    // Map countdown number to image index and size
    // 3 -> imagen 0, tamaño pequeño
    // 2 -> imagen 1, tamaño medio
    // 1 -> imagen 2, tamaño grande
    // 0 (GO) -> imagen 3, tamaño muy grande

    let imageIndex: number;
    let sizeClass: string;

    if (countdownNumber === 3) {
      imageIndex = 0;
      sizeClass = "w-56 h-56"; // Pequeño
    } else if (countdownNumber === 2) {
      imageIndex = 1;
      sizeClass = "w-64 h-64"; // Medio
    } else if (countdownNumber === 1) {
      imageIndex = 2;
      sizeClass = "w-72 h-72"; // Grande
    } else {
      // countdownNumber === 0 (GO!)
      imageIndex = 3;
      sizeClass = "w-80 h-80"; // Muy grande
    }

    // Get the image, cycling if we don't have enough images
    const image = imagesWithImages[imageIndex % imagesWithImages.length];

    return { image, sizeClass };
  };

  const currentImageData = getCurrentImageData();

  return (
    <div
      className={`min-h-screen ${gradient} flex flex-col items-center justify-center p-6 relative overflow-hidden`}
    >
      {/* Main Content */}
      <div className="bg-white rounded-2xl shadow-2xl p-16 w-full max-w-4xl text-center animate-fade-in z-10 relative">
        <div className="mb-20">
          <h1 className="text-6xl font-black text-gray-900 mb-12 animate-slide-in-up leading-tight bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent drop-shadow-lg">
            {title}
          </h1>
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-4xl font-bold text-gray-600">Nivel</h2>
            <span
              className={`px-10 py-5 rounded-full text-4xl font-bold ${getDifficultyColor(
                difficulty
              )}`}
            >
              {difficultyText}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-center">
          {countdownNumber > 0 ? (
            <div className="text-9xl font-bold text-indigo-600 animate-countdown">
              {countdownNumber}
            </div>
          ) : (
            <div className="text-9xl font-bold text-green-600 animate-countdown-go">
              ¡GO!
            </div>
          )}
        </div>
      </div>

      {/* Single Image Below - Changes with each countdown tick and grows in size */}
      {currentImageData && (
        <div className="mt-8 flex justify-center">
          {/* Fixed container with max size to prevent layout shifts */}
          <div className="w-56 h-56 flex items-start justify-start">
            <div
              className={`${currentImageData.sizeClass} rounded-2xl overflow-hidden shadow-2xl animate-fade-in opacity-60 hover:opacity-90 transition-all duration-500 transform hover:scale-105`}
            >
              <img
                key={`countdown-${countdownNumber}`} // Key to trigger re-render on image change
                src={currentImageData.image}
                alt={`Preview imagen ${4 - countdownNumber}`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CountdownPhase;
