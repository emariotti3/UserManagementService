import { IsAlphanumeric, IsString, IsInt, MinLength, MaxLength, IsAlpha, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';

import { IsStrongPassword } from '../validators/strongpwd.validator';

export class CreateUserDto {

    @IsString()
    @MinLength(5)
    @MaxLength(100)
    @IsNotEmpty()
    @Transform(({ value }) => value.trim())
    @IsAlphanumeric()
    username: string;

    @IsString()
    @MinLength(5)
    @MaxLength(100)
    @IsStrongPassword({ message: 'Provided password is not strong enough! Must have at least 1 uppercase and 1 lowercase character!' })
    password: string;

    @IsString()
    @MinLength(5)
    @MaxLength(100)
    @IsNotEmpty()
    @Transform(({ value }) => value.trim())
    name: string;

    @IsInt()
    cityId: number;

    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => value.trim())
    street: string;
}