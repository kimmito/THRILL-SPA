import { Module } from '@nestjs/common';
import { BreakController } from './break.controller';
import { BreakService } from './break.service';

@Module({
  controllers: [BreakController],
  providers: [BreakService],
  exports: [BreakService],
})
export class BreakModule {}
