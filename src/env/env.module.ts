import { Module } from '@nestjs/common';
import { EnvService } from './env.service';
import { EnvController } from './env.controller';

@Module({
  controllers: [EnvController],
  providers: [EnvService],
})
export class EnvModule {}
