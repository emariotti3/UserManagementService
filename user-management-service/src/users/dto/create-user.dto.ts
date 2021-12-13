import { IsString, IsInt, MinLength, MaxLength } from 'class-validator';

export class CreateUserDto {

    @IsString()
    @MinLength(5)
    @MaxLength(100)
    username: string;

    @IsString()
    @MinLength(5)
    @MaxLength(100)
    password: string;

    @IsString()
    @MinLength(5)
    @MaxLength(100)
    name: string;

    @IsInt()
    cityId: number;

    @IsString()
    street: string;
}