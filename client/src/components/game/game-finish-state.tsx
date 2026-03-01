import { Button } from '@/components/ui/button';
import { useMemo } from 'react';
import { useGame } from '../game-context';

export function GameFinishState() {
  const { state, playerReady } = useGame();

  const players = useMemo(
    () => Array.from(state.players.values()).sort((a, b) => b.score - a.score),
    [state.players],
  );

  return (
    <div className="space-y-6">
      <div className="text-center py-12">
        <h2 className="text-4xl font-bold text-blue-600 mb-8">
          🏆 Game Finished!
        </h2>

        <div className="space-y-4">
          {players.map((player, index) => {
            const medals = ['🥇', '🥈', '🥉'];
            const isCurrentPlayer = player.id === state.id;
            return (
              <div
                key={player.id}
                className={`p-4 rounded-lg text-lg font-semibold ${
                  isCurrentPlayer
                    ? 'bg-blue-100 border-2 border-blue-600'
                    : 'bg-gray-50'
                }`}
              >
                <span className="text-2xl">
                  {index < 3 ? medals[index] : `#${index + 1}`}
                </span>{' '}
                <span>
                  {isCurrentPlayer ? 'You' : `Player`} -{' '}
                  <strong>{player.score} points</strong>
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex gap-4 justify-center">
        {!state.currentPlayer.isReady ? (
          <Button
            onClick={playerReady}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2"
            size="lg"
            autoFocus
          >
            Play Again
          </Button>
        ) : (
          <p>Waiting for other pariticipants</p>
        )}
      </div>
    </div>
  );
}
