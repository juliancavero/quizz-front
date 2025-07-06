import Title from "@/components/Text/Title";

interface LoadingPhaseProps {
  gradient: string;
}

const LoadingPhase: React.FC<LoadingPhaseProps> = ({ gradient }) => {
  return (
    <div
      className={`min-h-screen ${gradient} flex items-center justify-center p-4`}
    >
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full">
        <div className="flex flex-col items-center text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mb-4"></div>
          <Title>Cargando quiz...</Title>
        </div>
      </div>
    </div>
  );
};

export default LoadingPhase;
