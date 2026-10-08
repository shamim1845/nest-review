import { Body, Controller, Post } from '@nestjs/common';
import { UppercasePipe } from 'src/common/pipes/uppercase/uppercase.pipe';

@Controller('myname')
export class MynameController {
    @Post("custom")
    myname(
        @Body("name", new UppercasePipe()) name:string,
        @Body() {age, email}:{age: number, email: string}
    ) {
        return `My name is ${name}. I ame ${age} years old. Email: ${email}`;
    }
}
