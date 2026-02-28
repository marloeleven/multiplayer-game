import { WSWebSocket } from '@root/const/type';

const generateId = () =>
  Date.now().toString() + Math.random().toString(36).substr(2, 9);

export class Player {
  id: string;
  ws: WSWebSocket;

  constructor(ws: WSWebSocket) {
    this.id = generateId();
    this.ws = ws;
  }
}
