'use client';

import { Button } from '@/components/ui/button';
import { useGame } from '../game-context';

export function WaitingReadyState() {
  const { state, playerReady } = useGame();

  return (
    <div className="text-center py-12">
      <p className="text-xl text-gray-600">
        Waiting for players to ready up for next round...
      </p>
      {!state.currentPlayer.isReady && (
        <Button
          onClick={playerReady}
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2"
          autoFocus
        >
          {`I'm Ready!`}
        </Button>
      )}
    </div>
  );
}
