export const MAX_ANSWER = parseInt(process.env.MAX_ANSWER ?? '100', 10);
export const ROUNDS_PER_GAME = parseInt(process.env.ROUNDS_PER_GAME || '5', 10);
export const COUNTDOWN_SECONDS = parseInt(
  process.env.COUNTDOWN_SECONDS || '5',
  10,
);

export const ANSWER_TIME_LIMIT = parseInt(
  process.env.ANSWER_TIME_LIMIT || '15',
  10,
);
export const BASE_POINT = parseInt(process.env.BASE_POINT || '5', 10);

export const PORT = Number(process.env.PORT || 8080);

export const PROTOCOL = process.env.PROTOCOL || 'wss';

export const HOSTNAME =
  process.env.HOSTNAME || 'multiplayer-game-gv7y.onrender.com';
