'use client';

import { useWebSocket } from '@/hooks/useWebSocket';
import { GAME_EVENT } from '@root/const/game';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

export const GAME_STATUS = {
  STARTING: 'starting', // intro, waiting for players to be ready
  PLAYING: 'playing', // currently playing
  WAITING: 'waiting', // next round waiting for everyone to be ready
  FINISH: 'finish', // finish screen
} as const;

export type GameStatus = typeof GAME_STATUS;
export type GameStatusValues = GameStatus[keyof GameStatus];

interface PlayerData {
  id: string;
  name: string;
  score: number;
  addedScore: number;
  isAnswerCorrect: boolean;
  hasAnswer: boolean;
  time: number;
  isReady: boolean;
}

interface GameContext {
  state: {
    isConnected: boolean;
    autoReady: boolean;
    id: string;
    name: string;
    players: Map<string, PlayerData>;
    question: string;
    status: (typeof GAME_STATUS)[keyof typeof GAME_STATUS];
    roundNumber: number;
    correctAnswer: string;
    currentPlayer: PlayerData;
  };
  joinGame: (name: string) => void;
  submitAnswer: (answer: string) => void;
  playerReady: () => void;
  onAutoReadyChange: (autoReady: boolean) => void;
}

type EventMessage<T> = {
  type: string;
  payload: T;
};

interface GameStatePayload {
  players: PlayerData[];
  question: string;
  status: (typeof GAME_STATUS)[keyof typeof GAME_STATUS];
  roundNumber: number;
}

export interface GameState extends Omit<GameStatePayload, 'players'> {
  autoReady: boolean;
  id: string;
  name: string;
  correctAnswer: string;
  players: Map<string, PlayerData>;
  currenPlayer: PlayerData;
}

const INITIAL_STATE: GameContext['state'] = {
  isConnected: false,
  autoReady: false,
  id: '',
  name: '',
  status: GAME_STATUS.STARTING,
  players: new Map(),
  question: '',
  roundNumber: 0,
  correctAnswer: '',
  currentPlayer: {
    id: '',
    isAnswerCorrect: false,
    hasAnswer: false,
    isReady: false,
    name: '',
    score: 0,
    addedScore: 0,
    time: 0,
  },
};

const GameContext = createContext<GameContext>({
  state: INITIAL_STATE,
  joinGame: () => {},
  submitAnswer: () => {},
  playerReady: () => {},
  onAutoReadyChange: () => {},
});

export function GameProvider({ children }: React.PropsWithChildren) {
  const [state, setState] = useState<GameState>({
    autoReady: false,
    id: '',
    name: '',
    status: GAME_STATUS.STARTING,
    players: new Map(),
    question: '',
    roundNumber: 0,
    correctAnswer: '',
    currenPlayer: {
      id: '',
      isAnswerCorrect: false,
      hasAnswer: false,
      isReady: false,
      name: '',
      score: 0,
      addedScore: 0,
      time: 0,
    },
  });

  const { isConnected, on, send, onJoin } = useWebSocket();

  useEffect(() => {
    const unsubscribeConnected = on(
      GAME_EVENT.GAME_CONNECTED,
      (data: EventMessage<{ id: string }>) => {
        setState((prev) => ({
          ...prev,
          id: data.payload.id,
        }));
      },
    );

    const unsubscribeGameState = on(
      GAME_EVENT.GAME_STATE,
      (data: EventMessage<GameStatePayload>) => {
        const debugOn = window.location.search.includes('debug');

        if (debugOn) {
          console.log(JSON.stringify(data.payload, null, 2));
        }
        setState((prev) => {
          const players = new Map(
            data.payload.players.map((player) => [player.id, player]),
          );

          const currenPlayer = players.get(prev.id)!;

          return {
            ...prev,
            ...data.payload,
            players,
            currenPlayer,
          };
        });
      },
    );

    return () => {
      unsubscribeConnected();
      unsubscribeGameState();
    };
  }, [on]);

  const submitAnswer = useCallback(
    (answer: string) => {
      send({
        type: GAME_EVENT.PLAYER_ANSWER,
        payload: {
          answer,
        },
      });
    },
    [send],
  );

  const playerReady = useCallback(() => {
    send({
      type: GAME_EVENT.PLAYER_READY,
    });
  }, [send]);

  const onAutoReadyChange = useCallback((autoReady: boolean) => {
    setState((prev) => ({
      ...prev,
      autoReady,
    }));
  }, []);

  return (
    <GameContext.Provider
      value={{
        state: {
          isConnected,
          ...state,
          currentPlayer: state.currenPlayer,
        },
        joinGame: onJoin,
        submitAnswer,
        playerReady,
        onAutoReadyChange,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  return useContext(GameContext);
}
