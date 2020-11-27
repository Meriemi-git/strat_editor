import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AgentController } from './agent/agent.controller';
import { AgentService } from './agent/agent.service';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RequestMiddleware } from './request-middleware';

@Module({
  imports: [],
  controllers: [AppController,AgentController],
  providers: [AppService,AgentService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RequestMiddleware)
      .forRoutes('/api');
  }
}
