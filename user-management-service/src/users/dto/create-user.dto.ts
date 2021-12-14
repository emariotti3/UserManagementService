import { IsString, IsInt, MinLength, MaxLength, IsAlphanumeric, IsAlpha } from 'class-validator';

export class CreateUserDto {

    @IsString()
    @MinLength(5)
    @MaxLength(100)
    @IsAlphanumeric()
    username: string;

    @IsString()
    @MinLength(5)
    @MaxLength(100)
    password: string;

    @IsString()
    @IsAlpha()
    @MinLength(5)
    @MaxLength(100)
    name: string;

    @IsInt()
    cityId: number;

    @IsString()
    street: string;
}