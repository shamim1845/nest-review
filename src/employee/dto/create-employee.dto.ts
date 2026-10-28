import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsObject, IsString, ValidateNested } from "class-validator";

class CreateProfileDto {
    @IsNumber()
    @IsNotEmpty()
    age: number;
    
    @IsString()
    @IsNotEmpty()
    qualification: string;
}

export class CreateEmployeeDto {
    @IsString()
    @IsNotEmpty()
    name: string;
    
    @Type(() => CreateProfileDto)
    @ValidateNested()
    @IsNotEmpty()
    profile: CreateProfileDto;
}
