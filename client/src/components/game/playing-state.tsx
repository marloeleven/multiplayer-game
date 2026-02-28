import { useCountdown } from '@/hooks/useCountdown';
import { ANSWER_TIME_LIMIT } from '@root/const/config';
import { FormEvent } from 'react';
import { useGame } from '../game-context';
import QuestionDisplay from '../question-display';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { TimerProgressBar } from './timer-progress-bar';

export function PlayingState({ isCountingDown }: { isCountingDown: boolean }) {
  const { state, submitAnswer } = useGame();
  const countdown = useCountdown(ANSWER_TIME_LIMIT);

  console.log('@Debug: ', countdown);

  const hasAnswer = state.currentPlayer.hasAnswer;

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);

    const answer = (formData.get('answer') as string).trim();

    if (answer) {
      submitAnswer(answer);
    }
  };

  if (isCountingDown) {
    return null;
  }

  return (
    <div className="space-y-8 relative">
      <TimerProgressBar current={countdown} base={ANSWER_TIME_LIMIT} />

      <QuestionDisplay question={state.question} />

      <form onSubmit={onSubmit}>
        <div className="space-y-3">
          <Input
            type="number"
            name="answer"
            placeholder="Enter your answer"
            disabled={isCountingDown || hasAnswer}
            className="text-lg p-4"
            autoFocus
          />
          <Button
            disabled={isCountingDown || hasAnswer}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 text-lg"
          >
            {hasAnswer ? '⏳ Submitted' : '✓ Submit Answer'}
          </Button>
        </div>
      </form>
    </div>
  );
}
