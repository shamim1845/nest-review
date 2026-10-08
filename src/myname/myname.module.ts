import { Module } from '@nestjs/common';
import { MynameController } from './myname.controller';

@Module({
    controllers: [MynameController]
})
export class MynameModule { }
