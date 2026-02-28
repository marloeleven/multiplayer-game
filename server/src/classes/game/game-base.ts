import { EventMessage, WSWebSocket } from '@root/const/type';

export class GameBase {
  clients = new Map<string, WSWebSocket>();

  broadcast(data: EventMessage) {
    const eventData = JSON.stringify(data);
    this.clients.forEach((client) => {
      client.send(eventData);
    });
  }
}
