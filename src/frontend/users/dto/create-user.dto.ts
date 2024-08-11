import { IsNotEmpty, IsOptional, IsString } from "class-validator"

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    email: string

    @IsString()
    @IsOptional()
    name?: string

    @IsString()
    @IsOptional()
    @IsNotEmpty()
    password: string

    @IsString()
    @IsOptional()
    avatar?: string
}
