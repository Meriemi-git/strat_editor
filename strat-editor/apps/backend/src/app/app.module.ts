import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RequestMiddleware } from './request.middleware';
import { AgentModule } from './agent/agent.module';
import { MapModule } from './map/map.module';
import { FloorModule } from './floor/floor.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/strat-editor'),
    AgentModule,
    MapModule,
    FloorModule
  ],

})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RequestMiddleware)
      .forRoutes('*');
  }
}
