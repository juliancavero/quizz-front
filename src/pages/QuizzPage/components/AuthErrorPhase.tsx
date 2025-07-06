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
      className={`min-h-screen ${gradient} flex items-center justify-center p-4`}
    >
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full">
        <div className="flex flex-col items-center text-center">
          <Title>Error de autenticación</Title>
          <p className="text-red-600 mt-2">No se pudo autenticar el usuario</p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors mt-4"
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
