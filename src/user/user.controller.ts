import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }
    
    @Get()
    getUser() {
        return this.userService.getUsers();
    }

    @Get(":id")
    getUserById(@Param("id") id: string) {
        return this.userService.getUser(+id);
    }

    @Post()
    createUser(@Body() data: any) {
        return this.userService.createUser(data);
    }

    @Patch(":id")
    updateUser(@Param("id") id: string, @Body() data: any) {
        return this.userService.updateUser(+id, data);
    }

    @Delete(":id")
    deleteUser(@Param("id") id: string) {
        return this.userService.deleteUser(+id);
    }
}
