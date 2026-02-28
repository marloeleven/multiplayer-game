
export function PlayingCountdown({ countdown }: { countdown: number }) {
  return (
    <div className="text-center py-12">
      <p className="text-6xl font-bold text-blue-600 animate-pulse">
        {countdown}
      </p>
      <p className="text-xl text-gray-600 mt-4">
        Game starting in {countdown} second
        {countdown !== 1 ? 's' : ''}...
      </p>
    </div>
  );
}
