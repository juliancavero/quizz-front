import Title from "@/components/Text/Title";

interface QuizNotFoundPhaseProps {
  gradient: string;
}

const QuizNotFoundPhase: React.FC<QuizNotFoundPhaseProps> = ({ gradient }) => {
  return (
    <div
      className={`min-h-screen ${gradient} flex items-center justify-center p-0.5 sm:p-1`}
    >
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl p-3 sm:p-4 md:p-6 max-w-xs sm:max-w-sm md:max-w-lg w-full">
        <div className="flex flex-col items-center text-center">
          <Title>Quiz no encontrado</Title>
          <p className="text-red-600 mt-2 text-sm sm:text-base">
            No se pudo encontrar el quiz solicitado
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuizNotFoundPhase;
