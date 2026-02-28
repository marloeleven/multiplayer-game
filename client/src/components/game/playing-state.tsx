import { FormEvent } from 'react';
import { useGame } from '../game-context';
import QuestionDisplay from '../question-display';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

export function PlayingState({ countdown }: { countdown: number }) {
  const { state, submitAnswer } = useGame();

  const hasAnswer = state.currentPlayer.hasAnswer;

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);

    const answer = (formData.get('answer') as string).trim();

    if (answer) {
      submitAnswer(answer);
    }
  };

  if (countdown) {
    return null;
  }

  return (
    <div className="space-y-8">
      <QuestionDisplay question={state.question} />

      <form onSubmit={onSubmit}>
        <div className="space-y-3">
          <Input
            type="number"
            name="answer"
            placeholder="Enter your answer"
            disabled={!!countdown || hasAnswer}
            className="text-lg p-4"
            autoFocus
          />
          <Button
            disabled={!!countdown || hasAnswer}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 text-lg"
          >
            {hasAnswer ? '⏳ Submitted' : '✓ Submit Answer'}
          </Button>
        </div>
      </form>
    </div>
  );
}
