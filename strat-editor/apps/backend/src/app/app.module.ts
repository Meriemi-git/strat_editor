import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RequestMiddleware } from './request.middleware';
import { AgentModule } from './agent/agent.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/strat-editor'),
    AgentModule
  ],

})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RequestMiddleware)
      .forRoutes('*');
  }
}
