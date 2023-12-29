import { USER_ROLE } from '@utils/enums';
import {
    IsEnum,
    IsNotEmpty,
    IsString
} from 'class-validator';

export class SignUpDto {

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
