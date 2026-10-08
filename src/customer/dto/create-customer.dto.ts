import { IsInt, IsNotEmpty, IsString, Min } from "class-validator";

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsNotEmpty()
  @Min(1)
  age: number;
}
