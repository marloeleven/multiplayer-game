import { useCountdown } from '@/hooks/useCountdown';
import { cn, once } from '@/lib/utils';
import { ANSWER_TIME_LIMIT, MAX_ANSWER } from '@root/const/config';
import { FormEvent, useEffect, useRef } from 'react';
import { useGame } from '../game-context';
import QuestionDisplay from '../question-display';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { TimerProgressBar } from './timer-progress-bar';

export function PlayingState() {
  const { state, submitAnswer } = useGame();
  const hasAnswerRef = useRef(false);

  const { countdown, cancel } = useCountdown(
    ANSWER_TIME_LIMIT,
    once(() => {
      if (!hasAnswerRef.current) {
        submitAnswer(String(MAX_ANSWER + 1));
      }
    }),
  );

  const hasAnswer = state.currentPlayer.hasAnswer;

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);

    const answer = (formData.get('answer') as string).trim();

    if (answer) {
      hasAnswerRef.current = true;
      cancel();
      submitAnswer(answer);
    }
  };

  useEffect(() => {
    hasAnswerRef.current = state.currentPlayer.hasAnswer;
  }, [state.currentPlayer.hasAnswer]);

  return (
    <div className="space-y-8 relative">
      <TimerProgressBar
        current={countdown}
        base={ANSWER_TIME_LIMIT}
        className={cn({
          invisible: !countdown,
        })}
      />

      <QuestionDisplay question={state.question} />

      <form onSubmit={onSubmit}>
        <div className="space-y-3">
          <Input
            type="text"
            name="answer"
            placeholder="Enter your answer"
            disabled={hasAnswer}
            className="text-lg p-4"
            autoFocus
          />
          <Button
            disabled={hasAnswer}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 text-lg"
          >
            {hasAnswer ? '⏳ Submitted' : '✓ Submit Answer'}
          </Button>
        </div>
      </form>
    </div>
  );
}
