import { IsNotEmpty, IsOptional, IsString } from "class-validator"

export class CreateRegisterDto {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    email: string

    @IsString()
    @IsOptional()
    name?: string

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    password: string
}
