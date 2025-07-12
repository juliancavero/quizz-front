import Title from "@/components/Text/Title";

interface LoadingPhaseProps {
  gradient: string;
}

const LoadingPhase: React.FC<LoadingPhaseProps> = ({ gradient }) => {
  return (
    <div
      className={`min-h-screen ${gradient} flex items-center justify-center p-0.5 sm:p-1`}
    >
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl p-3 sm:p-4 md:p-6 max-w-xs sm:max-w-sm md:max-w-lg w-full">
        <div className="flex flex-col items-center text-center">
          <div className="animate-spin rounded-full h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 border-b-2 border-indigo-500 mb-3 sm:mb-4"></div>
          <Title>Cargando quiz...</Title>
        </div>
      </div>
    </div>
  );
};

export default LoadingPhase;
