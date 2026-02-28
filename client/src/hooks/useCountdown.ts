import { useEffect, useState } from 'react';

export function useCountdown(initialValue = 10) {
  const [countdown, setCountdown] = useState(initialValue);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log('interval');
      setCountdown((prev) => {
        if (prev - 1 === 0) {
          clearInterval(interval);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return countdown;
}
