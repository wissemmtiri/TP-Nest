import { IsNotEmpty, MaxLength, MinLength } from "class-validator";
import { ValidationErrors } from "../enums/errors.enum";

export class AddTodoDto {
    @IsNotEmpty({ message: ValidationErrors.INVALID_NAME })
    @MinLength(3, { message: ValidationErrors.INVALID_NAME })
    @MaxLength(10, { message: ValidationErrors.INVALID_NAME })
    name: string;

    @IsNotEmpty({ message: ValidationErrors.INVALID_DESCRIPTION })
    @MinLength(10, { message: ValidationErrors.INVALID_DESCRIPTION })
    description: string;
}
