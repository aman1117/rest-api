import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) { }

    @Get()
    findAll(@Query('role') role?: 'admin' | 'user') {
        return this.usersService.findAll(role);
    }

    @Get(':id') // dynamic route
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(+id);
    }

    @Post()
    create(@Body() user: { name: string, email: string, role: 'admin' | 'user' }) {
        return this.usersService.create(user);

    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() userUpdate: { name?: string, email?: string, role: 'admin' | 'user' }) {
        return this.usersService.update(+id, userUpdate);

    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.usersService.remove(+id);
    }
}
