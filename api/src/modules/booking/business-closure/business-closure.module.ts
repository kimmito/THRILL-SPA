import { Module } from '@nestjs/common';
import { BusinessClosureService } from './business-closure.service';
import { BusinessClosureController } from './business-closure.controller';

@Module({
  controllers: [BusinessClosureController],
  providers: [BusinessClosureService],
  exports: [BusinessClosureService],
})
export class BusinessClosureModule {}
