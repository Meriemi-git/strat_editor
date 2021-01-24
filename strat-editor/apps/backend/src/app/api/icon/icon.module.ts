import { Module } from '@nestjs/common';
import { IconController } from './icon.controller';

@Module({
  imports: [],
  controllers: [IconController],
  providers: [],
})
export class IconModule {}
