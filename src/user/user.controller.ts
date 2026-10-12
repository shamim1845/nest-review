import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }
    
    @Get()
    getUser() {
        return this.userService.getUsers();
    }

    @Get(":id")
    getUserById(@Param("id") id: string) {
        return this.userService.getUser(id);
    }

    @Post()
    createUser(@Body() data: CreateUserDto) {
        return this.userService.createUser(data);
    }

    @Patch(":id")
    updateUser(@Param("id") id: string, @Body() data: UpdateUserDto) {
        return this.userService.updateUser(id, data);
    }

    @Delete(":id")
    deleteUser(@Param("id") id: string) {
        return this.userService.deleteUser(id);
    }
}
