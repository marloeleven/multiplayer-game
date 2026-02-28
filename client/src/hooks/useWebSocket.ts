import { HOSTNAME, PORT, PROTOCOL } from '@root/const/config';
import { GAME_EVENT } from '@root/const/game';
import type { EventMessage } from '@root/const/type';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

export function useWebSocket() {
  const [isConnected, setIsConnected] = useState(false);
  const ws = useRef<WebSocket | null>(null);
  const messageHandlers = useRef<Map<string, Function[]>>(new Map());

  const searchParams = useSearchParams();

  useEffect(() => {
    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  const onJoin = useCallback((name: string) => {
    const ip = searchParams.get('ip');
    const hostname = ip ?? HOSTNAME ?? window.location.hostname;

    const wsUrl = `${PROTOCOL}://${hostname}:${PORT}`;

    ws.current = new WebSocket(wsUrl);

    ws.current.onopen = () => {
      setIsConnected(true);
      console.log('WebSocket connected');

      send({
        type: GAME_EVENT.PLAYER_JOINED,
        payload: { name },
      });
    };

    ws.current.onmessage = (event) => {
      const message = JSON.parse(event.data);

      // Call registered handlers for this message type
      const handlers = messageHandlers.current.get(message.type) || [];
      handlers.forEach((handler) => handler(message));
    };

    ws.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.current.onclose = () => {
      setIsConnected(false);
      console.log('WebSocket disconnected');
    };
  }, []);

  const send = useCallback((message: EventMessage) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(message));
    }
  }, []);

  const on = useCallback((messageType: string, handler: Function) => {
    if (!messageHandlers.current.has(messageType)) {
      messageHandlers.current.set(messageType, []);
    }
    messageHandlers.current.get(messageType)!.push(handler);

    return () => {
      const handlers = messageHandlers.current.get(messageType);
      if (handlers) {
        const index = handlers.indexOf(handler);
        if (index > -1) {
          handlers.splice(index, 1);
        }
      }
    };
  }, []);

  return {
    isConnected,
    onJoin,
    send,
    on,
  };
}
