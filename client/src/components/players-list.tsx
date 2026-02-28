'use client';

import { cn } from '@/lib/utils';

import { Switch } from '@/components/ui/switch';
import { useMemo, useState } from 'react';
import { GAME_STATUS, useGame } from './game-context';

export default function PlayersList() {
  const { state } = useGame();
  const [hide, setHide] = useState(false);

  const sortedPlayers = useMemo(
    () =>
      Array.from(state.players.values())
        .slice(0)
        .sort((a, b) => b.score - a.score),
    [state.players],
  );

  const isWaiting = state.status === GAME_STATUS.WAITING;
  const isPlaying = state.status === GAME_STATUS.PLAYING;

  return (
    <div className="bg-gray-50 rounded-lg p-6 h-full">
      <h3 className="text-lg font-bold text-gray-900 mb-4 flex justify-between">
        <span>👥 Players ({state.players.size})</span>

        <Switch onCheckedChange={setHide} defaultChecked={hide} />
      </h3>

      {!state.players.size ? (
        <p className="text-gray-500 text-center py-8">No players yet...</p>
      ) : (
        <div
          className={cn('space-y-2', {
            hidden: hide,
          })}
        >
          {sortedPlayers.map((player, index) => {
            const isCurrentPlayer = player.id === state.id;
            const score = player.score;

            return (
              <div
                key={player.id}
                className={cn(
                  'p-3 rounded-lg flex items-center justify-between bg-white border border-gray-200',
                  {
                    'bg-blue-100 border-blue-300':
                      !isWaiting && isCurrentPlayer,
                    'bg-green-100 border-green-300':
                      (isWaiting && player.isReady) ||
                      (isPlaying && player.hasAnswer),
                  },
                )}
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <span className="text-lg font-semibold text-gray-700 flex-shrink-0">
                    #{index + 1}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate flex gap-2 items-center">
                      {isCurrentPlayer && 'You - '}
                      {player.name}
                    </p>
                  </div>
                </div>
                <div className="text-right flex-shrink-0 ml-2">
                  <p className="text-lg font-bold text-gray-900">{score}</p>
                  <p className="text-xs text-gray-500">pts</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
