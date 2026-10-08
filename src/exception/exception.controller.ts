import { Controller, Get, Param, ParseIntPipe, UseFilters } from '@nestjs/common';
import { ExceptionService } from './exception.service';
import { HttpExceptionFilter } from 'src/filter/http-exception/http-exception.filter';

@Controller('exception')
export class ExceptionController {
  constructor(private readonly exceptionService: ExceptionService) {}

  @Get("hello/:id") 
  @UseFilters(HttpExceptionFilter)
  getHello(@Param("id", ParseIntPipe) id: number){
    return `Hello ${id}`;
  }
}
