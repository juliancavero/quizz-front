import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

interface ResultsState {
  score: number;
  totalQuestions: number;
  quizTitle: string;
}

const ResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as ResultsState;

  useEffect(() => {
    if (!state) {
      navigate("/");
    }
  }, [state, navigate]);

  if (!state) {
    return null;
  }

  const { score, totalQuestions, quizTitle } = state;
  const percentage = Math.round((score / totalQuestions) * 100);

  const getResultMessage = () => {
    if (percentage >= 80) return "¡Excelente! 🎉";
    if (percentage >= 60) return "¡Bien hecho! 👏";
    if (percentage >= 40) return "¡Sigue practicando! 💪";
    return "¡Inténtalo de nuevo! 📚";
  };

  const getResultEmoji = () => {
    if (percentage >= 80) return "🏆";
    if (percentage >= 60) return "🥈";
    if (percentage >= 40) return "🥉";
    return "📖";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
        {/* Header */}
        <div className="mb-6">
          <div className="text-6xl mb-4 animate-bounce-slow">
            {getResultEmoji()}
          </div>
          <h1 className="text-2xl font-bold text-gray-800 bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent mb-2">
            {getResultMessage()}
          </h1>
          <p className="text-gray-600 text-sm">Quiz: {quizTitle}</p>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-center gap-4 mb-6 p-4 bg-gray-50 rounded-xl border">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800">{score}</div>
            <div className="text-xs text-gray-500 font-semibold">Correctas</div>
          </div>
          <div className="text-xl text-gray-300">/</div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800">
              {totalQuestions}
            </div>
            <div className="text-xs text-gray-500 font-semibold">Total</div>
          </div>
        </div>

        {/* Percentage */}
        <div className="mb-8">
          <div className="w-24 h-24 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto animate-pulse-slow">
            <div className="text-xl font-bold text-white">{percentage}%</div>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button
            onClick={() => navigate("/")}
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:shadow-lg active:scale-95"
          >
            Volver al inicio
          </button>
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-white text-gray-700 font-semibold py-3 px-6 rounded-lg border-2 border-gray-200 transition-all duration-300 hover:bg-gray-50 hover:border-gray-300 active:scale-95"
          >
            Repetir quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
