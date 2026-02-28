'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useMemo, useState } from 'react';
import { useGame } from './game-context';

export function GameLobby() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="w-full max-w-md">
      <div className="bg-white rounded-lg shadow-xl p-8">
        <h1 className="text-4xl font-bold text-center mb-2 text-blue-600">
          ⚡ Math Fast
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Challenge your friends to a lightning-fast math battle!
        </p>

        {loading ? (
          <ConnectingState />
        ) : (
          <InitialState loading={loading} setLoading={setLoading} />
        )}
      </div>
    </div>
  );
}

function ConnectingState() {
  return (
    <div className="text-center py-8">
      <div className="inline-block animate-spin">
        <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full"></div>
      </div>
      <p className="mt-4 text-gray-600">Connecting to game server...</p>
    </div>
  );
}
function InitialState({
  loading,
  setLoading,
}: {
  loading: boolean;
  setLoading: (_: boolean) => void;
}) {
  const { joinGame } = useGame();
  const randomName = useMemo(
    () => `Anonymous-` + Math.ceil(Math.random() * 1000),
    [],
  );

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const name = formData.get('name') as string;

        joinGame(name || randomName);
        setLoading(true);
      }}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Game Name
          </label>
          <Input
            name="name"
            type="text"
            placeholder={`Please enter your name or use: ${randomName}`}
            disabled={loading}
            className="w-full"
          />
        </div>

        <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded">
          <p>
            <strong>How to play:</strong> Enter a game name to join or create a
            game. Share the game name with friends and play together!
          </p>
        </div>

        <Button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2"
          size="lg"
        >
          Join Game
        </Button>
      </div>
    </form>
  );
}
