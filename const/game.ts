export const GAME_EVENT = {
  PLAYER_READY: 'player-ready',
  PLAYER_ANSWER: 'player-answer',
  PLAYER_JOINED: 'player-joined',

  // broadcasted
  GAME_CONNECTED: 'game-connected',
  GAME_WAITING_FOR_PLAYERS: 'game-waiting-for-players',
  GAME_STARTED: 'game-started',
  GAME_SET_QUESTION: 'game-set-question',
  GAME_START_NEXT_ROUND: 'game-start-next-round',
  GAME_ROUND_COMPLETE: 'game-round-complete',
  GAME_WAITING_READY: 'game-waiting-ready',
  GAME_FINISH: 'game-finish',
  GAME_STATE: 'game-state',
} as const;
