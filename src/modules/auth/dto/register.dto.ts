import { USER_ROLE } from '@utils/enums';
import {
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsString,
    Length
} from 'class-validator';

export class SignUpDto {

    @IsOptional()
    @Length(2, 100)
        firstname?: string;

    @IsOptional()
    @Length(2, 100)
        lastname?: string;

    @IsNotEmpty()
    @IsString()
        username: string;

    @IsNotEmpty()
    @IsString()
        password: string;
    
    @IsNotEmpty()
    @IsEnum(USER_ROLE)
        role: USER_ROLE;

}
