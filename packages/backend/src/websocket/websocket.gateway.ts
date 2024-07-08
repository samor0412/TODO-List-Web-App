import { Logger } from '@nestjs/common';
import {
  WebSocketGateway,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

interface Event {
  event: string;
  data?: any;
}

@WebSocketGateway(parseInt(process.env.SOCKET_PORT), {
  transports: ['websocket'],
  cors: false,
})
export class WebsocketsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private readonly logger = new Logger(WebsocketsGateway.name);

  // TodoListId to Socket Map
  private clients: Map<string, Set<Socket>> = new Map();

  @WebSocketServer() server: Server;

  afterInit() {
    this.logger.log('WebSocket Gateway initialized');
  }

  handleConnection(client: Socket) {
    const todoListId = client.handshake.query.todoListId;
    if (!todoListId || typeof todoListId !== 'string') {
      client.disconnect();
      return;
    }

    this.logger.log(`Client connected: ${client.id}`);
    if (this.clients.has(todoListId)) {
      this.clients.get(todoListId).add(client);
    } else {
      this.clients.set(todoListId, new Set([client]));
    }
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
    const todoListId = client.handshake.query.todoListId as string;
    this.clients.get(todoListId).delete(client);
    if (this.clients.get(todoListId).size === 0) {
      this.clients.delete(todoListId);
    }
  }

  emitByTodoListSubscribers(todoListId: string, { event, data }: Event) {
    const clients = this.clients.get(todoListId);
    if (clients?.size > 0) {
      clients.forEach((client) => client.emit(event, data));
    }
  }
}
