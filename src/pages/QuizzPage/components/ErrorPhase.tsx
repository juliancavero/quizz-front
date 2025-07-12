import Title from "@/components/Text/Title";

interface ErrorPhaseProps {
  quizId: string;
  onRetry: () => void;
  gradient: string;
}

const ErrorPhase: React.FC<ErrorPhaseProps> = ({
  quizId,
  onRetry,
  gradient,
}) => {
  return (
    <div
      className={`min-h-screen ${gradient} flex items-center justify-center p-0.5 sm:p-1`}
    >
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl p-3 sm:p-4 md:p-6 max-w-xs sm:max-w-sm md:max-w-lg w-full">
        <div className="flex flex-col items-center text-center">
          <Title>Error al cargar el quiz</Title>
          <p className="text-red-600 mt-2 mb-3 sm:mb-4 text-sm sm:text-base break-words">
            No se pudo cargar el quiz con ID: {quizId}
          </p>
          <button
            onClick={onRetry}
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-3 sm:px-4 rounded-lg transition-colors text-sm sm:text-base"
          >
            Reintentar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPhase;
