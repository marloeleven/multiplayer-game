'use client';

import { useCountdown } from '@/hooks/useCountdown';
import { cn } from '@/lib/utils';
import { ROUNDS_PER_GAME } from '@root/const/config';
import { CheckCheckIcon, XIcon } from 'lucide-react';
import { useEffect, useMemo, useRef } from 'react';
import { useGame } from '../game-context';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';

export default function RoundResults() {
  const { state, playerReady, onAutoReadyChange } = useGame();

  const autoReadyRef = useRef(state.autoReady);

  const { countdown } = useCountdown(5, () => {
    if (autoReadyRef.current) {
      playerReady();
    }
  });

  useEffect(() => {
    autoReadyRef.current = state.autoReady;
  }, [state.autoReady]);

  const sortedResults = useMemo(
    () =>
      Array.from(state.players.values())
        .slice(0)
        .sort((a, b) => a.time - b.time),
    [state.players],
  );

  return (
    <div className="space-y-6">
      {!state.currentPlayer.isReady && (
        <>
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 text-center">
            <p className="text-gray-600 text-sm font-semibold mb-2 uppercase">
              Correct Answer
            </p>
            <p className="text-5xl font-bold text-blue-600 font-mono">
              {state.correctAnswer}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              📊 Round Results
            </h3>
            <div className="space-y-2">
              {sortedResults.map((player, index) => {
                const isCurrentPlayer = player.id === state.id;
                const isCorrect = player.isAnswerCorrect;

                return (
                  <div
                    key={player.id}
                    className={`p-4 rounded-lg flex items-center justify-between ${
                      isCurrentPlayer
                        ? 'bg-blue-100 border border-blue-300'
                        : isCorrect
                          ? 'bg-green-50 border border-green-200'
                          : 'bg-red-50 border border-red-200'
                    }`}
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <span className="text-lg font-semibold text-gray-700 min-w-8">
                        #{index + 1}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-gray-900 flex gap-2 items-center">
                          <span>
                            {isCurrentPlayer ? 'You' : player.name} -
                            Answer:{' '}
                          </span>
                          {player.isAnswerCorrect ? (
                            <CheckCheckIcon className="text-green-400" />
                          ) : (
                            <XIcon className="text-red-400" />
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">
                        + {player.addedScore}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}

      {state.roundNumber < ROUNDS_PER_GAME && (
        <div className="bg-blue-50 p-4 rounded-lg text-center">
          <p className="text-gray-600 text-sm">
            Next round starting soon... Get ready!
          </p>

          {!state.currentPlayer.isReady && (
            <Button
              onClick={playerReady}
              className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2"
            >
              {state.autoReady
                ? `Auto ready in ${countdown}s...`
                : `I'm Ready!`}
            </Button>
          )}

          <div
            className={cn('flex gap-2 items-center justify-center mt-4', {
              hidden: !countdown,
            })}
          >
            <p>Toggle Auto ready:</p>
            <Checkbox
              onCheckedChange={onAutoReadyChange}
              defaultChecked={state.autoReady}
            />
          </div>
        </div>
      )}
    </div>
  );
}
