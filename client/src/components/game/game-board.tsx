'use client';

import { COUNTDOWN_SECONDS } from '@root/const/config';
import { useState } from 'react';
import { FloatingDebugger } from '../floating-debugger';
import { GAME_STATUS, GameState, useGame } from '../game-context';
import PlayersList from '../players-list';
import { GameFinishState } from './game-finish-state';
import { GameHeaders } from './headers';
import { PlayingState } from './playing-state';
import RoundResults from './round-results';
import { WaitingReadyState } from './waiting-ready-state';

export function GameBoard() {
  const { state } = useGame();

  const [countdown, setCountdown] = useState(COUNTDOWN_SECONDS);

  const isPlaying = state.status === GAME_STATUS.PLAYING;

  return (
    <div className="w-full max-w-4xl">
      <div className="bg-white rounded-lg shadow-xl overflow-hidden">
        <FloatingDebugger>
          {JSON.stringify(
            {
              status: state.status,
              countdown,
              round: state.roundNumber,
              correctAnswer: state.correctAnswer,
            },
            null,
            2,
          )}

          <br />
          {JSON.stringify(state.currentPlayer, null, 2)}
        </FloatingDebugger>
        {/* Header */}
        <GameHeaders setCountdown={setCountdown} status={state.status} />

        {/* Main Content */}
        <div className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Question and Answer */}
            <div className="lg:col-span-2">
              {isPlaying && !!countdown && (
                <div className="text-center py-12">
                  <p className="text-6xl font-bold text-blue-600 animate-pulse">
                    {countdown}
                  </p>
                  <p className="text-xl text-gray-600 mt-4">
                    Game starting in {countdown} second
                    {countdown !== 1 ? 's' : ''}...
                  </p>
                </div>
              )}

              <Display
                status={state.status}
                isPlaying={isPlaying}
                countdown={countdown}
              />
            </div>

            {/* Right: Players List */}
            <div>
              <PlayersList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Display({
  status,
  isPlaying,
  countdown,
}: {
  status: GameState['status'];
  isPlaying: boolean;
  countdown: number;
}) {
  if (status === GAME_STATUS.STARTING) {
    return <WaitingReadyState />;
  }

  if (status === GAME_STATUS.FINISH) {
    return <GameFinishState />;
  }

  if (status === GAME_STATUS.WAITING) {
    return <RoundResults />;
  }

  if (isPlaying) {
    return <PlayingState countdown={countdown} />;
  }

  return null;
}
