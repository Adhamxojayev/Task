import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { BaseEntity } from 'typeorm';

export class CreateStudentDto extends BaseEntity {

    @IsNotEmpty()
    @IsString()
        username: string;
		
    @IsNotEmpty()
    @IsString()
        password: string;
		
    @IsOptional()
        role?: string;
		
}