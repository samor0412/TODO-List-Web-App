import { Global, Module } from '@nestjs/common';
import { WebsocketsGateway } from './websocket.gateway';

@Global()
@Module({
  providers: [WebsocketsGateway],
  exports: [WebsocketsGateway],
})
export class WebsocketsGatewayModule {}
