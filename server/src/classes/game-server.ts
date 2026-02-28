import express from 'express';
import http from 'http';
import { WebSocketServer } from 'ws';

import { PORT } from '@root/const/config';
import { GAME_EVENT } from '@root/const/game';
import { WSWebSocket } from '@root/const/type';
import { MathGame } from './game/math';
import { Player } from './player';

const app = express();
app.use(express.json());
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

const GAMES = {
  MATH: 'math',
};

export class GameServer {
  games = new Map<string, MathGame>();
  clients = new Map<string, WSWebSocket>();

  constructor() {
    this.games.set(GAMES.MATH, new MathGame());
  }

  get mathGame() {
    return this.games.get(GAMES.MATH)!;
  }

  start() {
    wss.on('connection', (ws) => {
      const player = new Player(ws);
      this.clients.set(player.id, player.ws);

      console.log('Client connected: ' + player.id);

      ws.on('message', (data: string) => {
        try {
          const eventData = JSON.parse(data);

          if (eventData.type === GAME_EVENT.PLAYER_JOINED) {
            this.mathGame.addPlayer(player, eventData.payload.name, ws);
          }
        } catch (error: any) {
          console.error('Error: ', error.message);
        }
      });

      ws.on('close', () => {
        console.log('Client disconnected: ' + player.id);
        this.clients.delete(player.id);
        this.mathGame.removePlayer(player);
      });

      ws.send(
        JSON.stringify({
          type: GAME_EVENT.GAME_CONNECTED,
          payload: {
            id: player.id,
          },
        }),
      );
    });

    server.listen(PORT, '0.0.0.0', () => {
      console.log(`🎮 Math Fast server is running on http://0.0.0.0:${PORT}`);
      console.log(`📡 WebSocket server ready on ws://0.0.0.0:${PORT}`);
      console.log(`💡 Open Next.js client on http://localhost:3000`);
    });
  }
}
