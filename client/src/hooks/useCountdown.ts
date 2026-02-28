import { useEffect, useRef, useState } from 'react';

export function useCountdown(initialValue = 10, onComplete = () => {}) {
  const [countdown, setCountdown] = useState(initialValue);
  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev - 1 === 0) {
          clearInterval(intervalRef.current);
          onComplete();
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  return {
    countdown,
    cancel: () => {
      setCountdown(0);
      clearInterval(intervalRef.current);
    },
  };
}
