import { Dispatch, SetStateAction, useEffect } from 'react';
import { GAME_STATUS, GameState, useGame } from '../game-context';

import { SOUND_TYPE, soundManager } from '@/lib/sound';
import { cn } from '@/lib/utils';
import { COUNTDOWN_SECONDS, ROUNDS_PER_GAME } from '@root/const/config';

export function GameHeaders({
  setCountdown,
  status,
}: {
  setCountdown: Dispatch<SetStateAction<number>>;
  status: GameState['status'];
}) {
  const { state } = useGame();

  const isFinished = state.status === GAME_STATUS.FINISH;

  useEffect(() => {
    if (status === GAME_STATUS.PLAYING) {
      soundManager.playAudio(SOUND_TYPE.COUNTDOWN, 0, 900);
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev - 1 === 0) {
            soundManager.playAudio(SOUND_TYPE.COUNTDOWN, 2, 900);
            clearInterval(interval);
            return 0;
          }

          soundManager.playAudio(SOUND_TYPE.COUNTDOWN, 0, 900);
          return prev - 1;
        });
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }

    if (GAME_STATUS.WAITING === status || GAME_STATUS.FINISH === status) {
      setCountdown(COUNTDOWN_SECONDS);
    }
  }, [status, setCountdown]);

  return (
    <div className="bg-linear-to-r from-blue-600 to-indigo-600 text-white p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">⚡ Math Fast</h1>
        </div>
        <div
          className={cn('text-right', {
            hidden: isFinished,
          })}
        >
          <p className="text-2xl font-bold">
            Round {Math.max(state.roundNumber, 1)}/{ROUNDS_PER_GAME}
          </p>
        </div>
      </div>
    </div>
  );
}
