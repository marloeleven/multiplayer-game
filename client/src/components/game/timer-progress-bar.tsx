import { cn } from '@/lib/utils';

function getClassColor(percentage: number) {
  if (percentage > 70) {
    return 'bg-blue-400';
  }

  if (percentage > 40) {
    return 'bg-orange-400';
  }

  return 'bg-red-400';
}

export function TimerProgressBar({
  current,
  base,
  className,
}: {
  current: number;
  base: number;
  className?: string;
}) {
  const percentage = Math.max(0, Math.min(100, (current / base) * 100));

  const style: Record<string, string> = {
    '--progress-duration': `${base}s`,
    '--blink-duration': `300ms`,
    '--blink-opacity': percentage > 40 ? '1' : `0.3`,
  };

  return (
    <div className="absolute top-0 left-0 w-full h-2 overflow-hidden">
      <div
        className={cn(
          'absolute inset-0 h-full will-change-transform animate-progressbar progress-bar-striped',
          getClassColor(percentage),
          className,
        )}
        style={style}
      />
    </div>
  );
}
