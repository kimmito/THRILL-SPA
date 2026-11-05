import { Module } from '@nestjs/common';
import { BreakController } from './break.controller';
import { BreakService } from './break.service';
import { UserModule } from '@src/modules/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [BreakController],
  providers: [BreakService],
  exports: [BreakService],
})
export class BreakModule {}
