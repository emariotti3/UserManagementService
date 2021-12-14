import { IsString, MinLength, MaxLength, IsInt } from 'class-validator';

export class ValidatedUserDto {

    @IsInt()
    id: number;

    @IsString()
    @MinLength(5)
    @MaxLength(100)
    username: string;

}