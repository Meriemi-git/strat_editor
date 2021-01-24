import { MailerService } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { ImageSchema } from '@strat-editor/data';
import { jwtConstants } from '../../strategies/constants';
import { GalleryController } from './gallery.controller';
import { GalleryService } from './gallery.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Image', schema: ImageSchema }]),
    MulterModule.register({
      dest: './upload',
    }),
    JwtModule.register({
      secret: jwtConstants.secret,
    }),
  ],

  controllers: [GalleryController],
  providers: [GalleryService],
})
export class GalleryModule {}
