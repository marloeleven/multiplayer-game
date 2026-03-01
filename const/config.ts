export const MAX_ANSWER = parseInt(
  process.env.NEXT_PUBLIC_MAX_ANSWER ?? '100',
  10,
);
export const ROUNDS_PER_GAME = parseInt(
  process.env.NEXT_PUBLIC_ROUNDS_PER_GAME || '5',
  10,
);
export const COUNTDOWN_SECONDS = parseInt(
  process.env.NEXT_PUBLIC_COUNTDOWN_SECONDS || '5',
  10,
);

export const ANSWER_TIME_LIMIT = parseInt(
  process.env.NEXT_PUBLIC_ANSWER_TIME_LIMIT || '15',
  10,
);
export const BASE_POINT = parseInt(
  process.env.NEXT_PUBLIC_BASE_POINT || '5',
  10,
);

export const WS_PORT = Number(process.env.NEXT_PUBLIC_WS_PORT || 8080);

export const WS_PROTOCOL = process.env.NEXT_PUBLIC_WS_PROTOCOL || 'wss';

export const HOSTNAME_URL =
  process.env.NEXT_PUBLIC_HOSTNAME_URL || 'multiplayer-game-gv7y.onrender.com';
