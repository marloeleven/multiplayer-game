'use client';

import { useGame } from '@/components/game-context';
import { GameLobby } from '@/components/game-lobby';
import { GameBoard } from '@/components/game/game-board';
import { QuestionDisplay } from '@/components/game/question-display';

export default function Home() {
  const { state } = useGame();

  return (
    <main className="w-full min-h-screen flex items-center justify-center p-4">
      {/* initialize MathJax */}
      <QuestionDisplay question="1 + 1 =" className="hidden" />
      {!state.isConnected ? <GameLobby /> : <GameBoard />}
    </main>
  );
}
