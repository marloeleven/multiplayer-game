import { GAME_EVENT } from './game';

export type { WebSocket as WSWebSocket } from 'ws';

type WSEvent<T, Payload = undefined> = {
  type: T;
  payload?: Payload;
};

export type PlayerReadyEvent = WSEvent<typeof GAME_EVENT.PLAYER_READY>;

export type PlayerAnswerEvent = WSEvent<
  typeof GAME_EVENT.PLAYER_ANSWER,
  {
    answer: string;
  }
>;

export type PlayerJoinedEvent = WSEvent<
  typeof GAME_EVENT.PLAYER_JOINED,
  {
    name: string;
  }
>;

export type GameWaitingForPlayersEvent = WSEvent<
  typeof GAME_EVENT.GAME_WAITING_FOR_PLAYERS
>;
export type GameStartedEvent = WSEvent<typeof GAME_EVENT.GAME_STARTED>;
export type GameStateEvent<T> = WSEvent<
  typeof GAME_EVENT.GAME_STATE,
  Record<string, T>
>;
export type GameSetQuestionEvent = WSEvent<typeof GAME_EVENT.GAME_SET_QUESTION>;
export type GameStartNextRoundEvent = WSEvent<
  typeof GAME_EVENT.GAME_START_NEXT_ROUND
>;
export type GameRoundCompleteEvent = WSEvent<
  typeof GAME_EVENT.GAME_ROUND_COMPLETE
>;
export type GameWaitingReadyEvent = WSEvent<
  typeof GAME_EVENT.GAME_WAITING_READY
>;
export type GameFinishEvent = WSEvent<typeof GAME_EVENT.GAME_FINISH>;

export type EventMessage =
  | PlayerReadyEvent
  | PlayerAnswerEvent
  | PlayerJoinedEvent
  | GameWaitingForPlayersEvent
  | GameStartedEvent
  | GameStateEvent<any>
  | GameSetQuestionEvent
  | GameStartNextRoundEvent
  | GameRoundCompleteEvent
  | GameWaitingReadyEvent
  | GameFinishEvent;

export type PlayerId = string;
