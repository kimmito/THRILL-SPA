import { Module } from '@nestjs/common';
import { BusinessClosureService } from './business-closure.service';
import { BusinessClosureController } from './business-closure.controller';
import { UserModule } from '@src/modules/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [BusinessClosureController],
  providers: [BusinessClosureService],
  exports: [BusinessClosureService],
})
export class BusinessClosureModule {}
