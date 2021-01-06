import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RequestMiddleware } from './request.middleware';
import { AgentModule } from './agent/agent.module';
import { MapModule } from './map/map.module';
import { FloorModule } from './floor/floor.module';
import { IconModule } from './icon/icon.module';
import { FontModule } from './fonts/font.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/strat-editor'),
    AgentModule,
    MapModule,
    FloorModule,
    IconModule,
    FontModule,
    UserModule,
    AuthModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestMiddleware).forRoutes('/api');
  }
}
