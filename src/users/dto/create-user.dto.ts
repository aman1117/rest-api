import { IsEmail, IsEnum, IsString, IsNotEmpty } from 'class-validator';

// Data we will be receiving from the client to create a new user
export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;

    @IsEnum(['admin', 'user'], {
        message: 'Role must be either admin or user'
    })
    role: 'admin' | 'user';
}
