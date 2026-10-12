import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ExceptionService } from './exception.service';

@Controller('exception')
export class ExceptionController {
  constructor(private readonly exceptionService: ExceptionService) {}

  @Get("hello/:id") 
  getHello(@Param("id", ParseIntPipe) id: number){
    return `Hello ${id}`;
  }
}
