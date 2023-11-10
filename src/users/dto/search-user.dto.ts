import { IsEmail, IsNotEmpty } from "class-validator";

export class SearchUserDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;
}