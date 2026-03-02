'use client';

import { useGame } from '@/components/game-context';
import { GameLobby } from '@/components/game-lobby';
import { GameBoard } from '@/components/game/game-board';
import { QuestionDisplay } from '@/components/game/question-display';

export default function Home() {
  const { state } = useGame();

  return (
    <>
      {/* initialize MathJax */}
      <QuestionDisplay question="8 / 2 =" className="hidden" />
      {!state.isConnected ? <GameLobby /> : <GameBoard />}
    </>
  );
}
