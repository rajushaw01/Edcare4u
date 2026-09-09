import { useState, useEffect, useRef } from "react";

export function useCountdown(totalSeconds) {
  const [timeLeft, setTimeLeft] = useState(totalSeconds);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (totalSeconds <= 0) {
      setIsTimeUp(true);
      return;
    }

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          setIsTimeUp(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [totalSeconds]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formatted = `${minutes}:${String(seconds).padStart(2, "0")}`;

  return { timeLeft, formatted, isTimeUp };
}
