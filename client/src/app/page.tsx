'use client';

import { useGame } from '@/components/game-context';
import { GameLobby } from '@/components/game-lobby';
import { GameBoard } from '@/components/game/game-board';

export default function Home() {
  const { state } = useGame();

  return (
    <main className="w-full min-h-screen flex items-center justify-center p-4">
      {!state.isConnected ? <GameLobby /> : <GameBoard />}
    </main>
  );
}
