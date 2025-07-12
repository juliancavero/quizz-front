import Title from "@/components/Text/Title";

interface AuthErrorPhaseProps {
  onRetry?: () => void;
  gradient: string;
}

const AuthErrorPhase: React.FC<AuthErrorPhaseProps> = ({
  onRetry,
  gradient,
}) => {
  return (
    <div
      className={`min-h-screen ${gradient} flex items-center justify-center p-0.5 sm:p-1`}
    >
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl p-3 sm:p-4 md:p-6 max-w-xs sm:max-w-sm md:max-w-lg w-full">
        <div className="flex flex-col items-center text-center">
          <Title>Error de autenticación</Title>
          <p className="text-red-600 mt-2 text-sm sm:text-base">
            No se pudo autenticar el usuario
          </p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-3 sm:px-4 rounded-lg transition-colors mt-3 sm:mt-4 text-sm sm:text-base"
            >
              Reintentar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthErrorPhase;
