import {
  BASE_POINT,
  COUNTDOWN_SECONDS,
  MAX_ANSWER,
  ROUNDS_PER_GAME,
} from '@root/const/config';
import { GAME_EVENT } from '@root/const/game';
import { EventMessage, WSWebSocket } from '@root/const/type';
import { Player } from '../player';
import { GameBase } from './game-base';

interface PlayerData {
  name: string;
  score: number;
  addedScore: number;
  currentAnswer: string;
  time: number;
  isReady: boolean;
}

interface Question {
  num1: number;
  num2: number;
  answer: number;
  operation: string;
  questionText: string;
}

const GAME_STATUS = {
  STARTING: 'starting', // intro, waiting for players to be ready
  PLAYING: 'playing', // currently playing
  WAITING: 'waiting', // next round waiting for everyone to be ready
  FINISH: 'finish', // finish screen
} as const;

type GameStatus = typeof GAME_STATUS;
type GameStatusValue = GameStatus[keyof GameStatus];

export class MathGame extends GameBase {
  players = new Map<string, PlayerData>();
  roundStartTime = Date.now();
  roundNumber = 0;
  status: GameStatusValue = GAME_STATUS.STARTING;
  question: Question = {
    num1: 0,
    num2: 0,
    answer: 0,
    operation: '+',
    questionText: '',
  };

  addPlayer(player: Player, name: string, ws: WSWebSocket) {
    this.players.set(player.id, {
      name,
      score: 0,
      addedScore: 0,
      currentAnswer: '',
      time: Date.now(),
      isReady: false,
    });

    this.clients.set(player.id, ws);

    const gamePlayer = this.players.get(player.id)!;

    player.ws.on('message', (data: string) => {
      try {
        this.handlePlayerMessage(gamePlayer, JSON.parse(data));
      } catch (error: any) {
        console.error('Error: ' + error.message);
      }
    });

    this.broadcastGameState();
  }

  removePlayer(player: Player) {
    this.players.delete(player.id);
    this.clients.delete(player.id);

    if (this.players.size === 0) {
      this.status = GAME_STATUS.STARTING;

      this.players.forEach((player) => {
        player.score = 0;
      });
      this.reset();
    }

    this.broadcastGameState();
  }

  reset() {
    this.roundStartTime = Date.now();
    this.roundNumber = 0;
  }

  prepareNext() {
    this.question = {
      num1: 0,
      num2: 0,
      answer: 0,
      operation: '+',
      questionText: '',
    };
    this.status = GAME_STATUS.WAITING;
  }

  private broadcastGameState(correctAnswer = '') {
    console.debug('Game status: ', this.status);
    this.broadcast({
      type: GAME_EVENT.GAME_STATE,
      payload: {
        players: Array.from(this.players).map(([playerId, data]) => ({
          ...data,
          currentAnswer: '',
          isAnswerCorrect: Number(data.currentAnswer) === this.question.answer,
          hasAnswer: !!data.currentAnswer.length,
          id: playerId,
        })),
        question: this.question.questionText,
        status: this.status,
        roundNumber: this.roundNumber,
        correctAnswer,
      },
    });
  }

  private get playersState() {
    return Array.from(this.players.values());
  }

  private generateQuestion(): Question {
    const operations = ['+', '-', '*', '/'];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    let num1 = 0;
    let num2 = 0;
    let answer = 0;

    if (operation === '/') {
      num2 = Math.floor(Math.random() * 9) + 1; // 1-9
      answer = Math.floor(Math.random() * 10) + 1; // 1-10
      num1 = answer * num2;
    } else {
      num1 = Math.floor(Math.random() * (MAX_ANSWER + 1));
      num2 = Math.floor(Math.random() * (MAX_ANSWER + 1));

      if (operation === '+') {
        answer = num1 + num2;
      } else if (operation === '-') {
        answer = num1 - num2;
        if (answer < 0) {
          [num1, num2] = [num2, num1];
          answer = num1 - num2;
        }
      } else if (operation === '*') {
        answer = num1 * num2;
      }
    }

    // Ensure answer is within 0-MAX_ANSWER
    if (answer > MAX_ANSWER) {
      return this.generateQuestion();
    }

    return {
      num1,
      num2,
      operation,
      answer: Math.floor(answer),
      questionText: `${num1} ${operation} ${num2} = ?`,
    };
  }

  getBonusPoint(timeInSeconds: number, rank: number) {
    // Rank bonus: reward players for being among the fastest
    // 1st place: 10 points, 2nd: 8 points, 3rd: 6 points, etc.
    // Ensures every correct answer gets at least 1 bonus point
    const rankBonus = Math.max(1, BASE_POINT - rank * 2);

    // Time bonus: reward speed with diminishing returns
    // Max 10 seconds threshold - answers beyond 10s get no time bonus
    // Scales linearly: faster answers = more bonus
    const timeBonus = Math.max(0, Math.ceil(BASE_POINT - timeInSeconds));

    return rankBonus + timeBonus;
  }

  private updateScore() {
    this.playersState
      .sort((a, b) => a.time - b.time)
      .forEach((player, rank) => {
        const isCorrect = Number(player.currentAnswer) === this.question.answer;

        if (isCorrect) {
          const bonusPoints = this.getBonusPoint(
            Math.floor((player.time - this.roundStartTime) / 1000) -
              COUNTDOWN_SECONDS,
            rank,
          );

          const addedScore = BASE_POINT + bonusPoints;
          player.score += addedScore;
          player.addedScore = addedScore;
        }
      });
  }

  get isAllReady() {
    return this.playersState.every((data) => !!data.isReady);
  }

  private async checkAllAnswered() {
    const hasAllAnswered = this.playersState.every(
      (data) => !!data.currentAnswer.length,
    );

    if (hasAllAnswered) {
      const answer = String(this.question.answer);
      this.updateScore();

      this.playersState.forEach((data) => {
        data.isReady = false;
      });

      this.status = GAME_STATUS.WAITING;
      if (this.roundNumber >= ROUNDS_PER_GAME) {
        this.status = GAME_STATUS.FINISH;

        this.broadcastGameState(answer);

        this.reset();
        return;
      }

      this.broadcastGameState(answer);
      return;
    }

    this.broadcastGameState();
  }

  private startNextRound() {
    this.question = this.generateQuestion();
    this.roundStartTime = Date.now();
    this.roundNumber += 1;

    this.players.forEach((player) => {
      player.currentAnswer = '';
      player.addedScore = 0;
    });

    this.status = GAME_STATUS.PLAYING;
  }

  private async handlePlayerMessage(
    player: PlayerData,
    { type: eventName, payload }: EventMessage,
  ) {
    switch (eventName) {
      case GAME_EVENT.PLAYER_READY:
        player.isReady = true;

        if (this.isAllReady) {
          if (this.roundNumber === 0) {
            this.players.forEach((player) => {
              player.score = 0;
            });
          }

          this.startNextRound();
          this.broadcastGameState();
          return;
        }

        this.broadcastGameState(String(this.question.answer));

        break;
      case GAME_EVENT.PLAYER_ANSWER:
        player.currentAnswer = payload!.answer;
        player.time = Date.now();

        this.checkAllAnswered();
        break;
    }
  }
}
