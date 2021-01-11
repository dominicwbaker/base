import { Module } from '@nestjs/common';

import { ScenesController } from './scenes.controller';
import { ScenesService } from './scenes.service';

@Module({
  imports: [],
  controllers: [ScenesController],
  providers: [ScenesService],
})
export class ScenesModule {}
