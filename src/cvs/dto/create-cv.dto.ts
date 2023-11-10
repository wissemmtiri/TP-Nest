import { IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator";

export class CreateCvDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    firstname: string;

    @IsNotEmpty()
    @IsNumber()
    @Max(65)
    @Min(18)
    age: number;

    @IsNotEmpty()
    @Max(99999999)
    @Min(10000000)
    cin: number;

    @IsNotEmpty()
    @IsString()
    job: string;

    @IsNotEmpty()
    @IsString()
    path: string;
}
