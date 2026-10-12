import { PartialType } from "@nestjs/mapped-types";
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength, MaxLength, Min,  } from "class-validator";

export class CreateStudentDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(30)
    name: string;

    @IsNumber()
    @Min(18)
    @IsNotEmpty()
    age: number;

    @IsEmail()
    @IsOptional()
    email?: string;
}


export class UpdateStudentDto extends PartialType(CreateStudentDto) {}