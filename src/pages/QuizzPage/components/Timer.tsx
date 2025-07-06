import React, { useEffect, useState, useRef } from "react";
import { config } from "../../../../config";

interface TimerProps {
  onComplete?: () => void;
  onMidpoint?: () => void;
}

const Timer: React.FC<TimerProps> = ({ onComplete, onMidpoint }) => {
  const duration = config.timeToPlay * 1000; // convertir segundos a millisegundos
  const [progress, setProgress] = useState(0); // 0 a 1
  const [timeLeft, setTimeLeft] = useState<number>(config.timeToPlay); // Tiempo restante en segundos
  const onCompleteRef = useRef(onComplete);
  const onMidpointRef = useRef(onMidpoint);

  // Update ref when onComplete or onMidpoint changes
  useEffect(() => {
    onCompleteRef.current = onComplete;
    onMidpointRef.current = onMidpoint;
  }, [onComplete, onMidpoint]);

  useEffect(() => {
    let startTime: number | null = null;
    let animationFrame: number;
    let midpointTriggered = false;

    const animate = (timestamp: number) => {
      startTime ??= timestamp;
      const elapsed = timestamp - startTime;
      const newProgress = Math.min(elapsed / duration, 1);
      const remainingTime = Math.max(0, Math.ceil((duration - elapsed) / 1000));

      setProgress(newProgress);
      setTimeLeft(remainingTime);

      // Trigger midpoint callback when progress reaches 50%
      if (newProgress >= 0.5 && !midpointTriggered) {
        midpointTriggered = true;
        onMidpointRef.current?.();
      }

      if (elapsed >= duration) {
        onCompleteRef.current?.();
      } else {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, []); // Remove onComplete dependency

  const circumference = 2 * Math.PI * 24; // radio de 24
  const strokeDashoffset = circumference - progress * circumference;

  // Determinar colores basados en el progreso
  const getProgressColor = () => {
    if (progress > 0.7) return "#ef4444";
    if (progress > 0.4) return "#f59e0b";
    return "#10b981";
  };

  const getTextColor = () => {
    if (progress > 0.7) return "text-red-500";
    if (progress > 0.4) return "text-yellow-500";
    return "text-green-500";
  };

  return (
    <div className="z-10">
      <div className="relative w-16 h-16 bg-white rounded-full shadow-lg border-2 border-gray-200">
        {/* Círculo de progreso */}
        <svg className="w-full h-full -rotate-90" viewBox="0 0 64 64">
          {/* Círculo de fondo (tiempo restante - claro) */}
          <circle
            cx="32"
            cy="32"
            r="24"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="6"
            opacity="0.3"
          />
          {/* Círculo de progreso (tiempo transcurrido - oscuro) */}
          <circle
            cx="32"
            cy="32"
            r="24"
            fill="none"
            stroke={getProgressColor()}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-100 ease-linear"
            opacity="0.9"
          />
        </svg>

        {/* Centro del cronómetro */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className={`text-3xl font-bold ${getTextColor()}`}>
              {timeLeft}
            </div>
          </div>
        </div>

        {/* Indicador de cronómetro (corona) */}
      </div>
    </div>
  );
};

export default Timer;
