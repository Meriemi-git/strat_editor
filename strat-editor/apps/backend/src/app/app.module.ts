import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AgentModule } from './agent/agent.module';
import { MapModule } from './map/map.module';
import { FloorModule } from './floor/floor.module';
import { IconModule } from './icon/icon.module';
import { FontModule } from './fonts/font.module';
import { UserModule } from './user/user.module';
import { GalleryModule } from './gallery/gallery.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { AuthModule } from './auth/auth.module';
import { RateLimiterModule } from 'nestjs-rate-limiter';

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
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    //consumer.apply(RequestMiddleware).forRoutes('/');
  }
}
