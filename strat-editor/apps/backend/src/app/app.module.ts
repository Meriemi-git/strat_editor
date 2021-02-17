import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AgentModule } from './api/agent/agent.module';
import { MapModule } from './api/map/map.module';
import { FloorModule } from './api/floor/floor.module';
import { IconModule } from './api/icon/icon.module';
import { FontModule } from './api/fonts/font.module';
import { UserModule } from './api/user/user.module';
import { GalleryModule } from './api/gallery/gallery.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { AuthModule } from './api/auth/auth.module';
import { RateLimiterModule } from 'nestjs-rate-limiter';
import { StratModule } from './api/strat/strat.module';
import { RequestMiddleware } from './request.middleware';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/strat-editor', {
      useCreateIndex: true,
    }),
    MailerModule.forRoot({
      transport:
        'smtps://contact@aboucipu.fr:8W9!d2aqvRerScSkdLrL@ssl0.ovh.net:465',
      defaults: {
        from: '"nest-modules" <modules@nestjs.com>',
      },
    }),
    AgentModule,
    MapModule,
    FloorModule,
    IconModule,
    FontModule,
    AuthModule,
    UserModule,
    GalleryModule,
    RateLimiterModule,
    StratModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    //consumer.apply(RequestMiddleware).forRoutes('/api/auth/*');
  }
}
