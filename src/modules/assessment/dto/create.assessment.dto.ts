import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { BaseEntity } from 'typeorm';

export class CreateAssessmentDto extends BaseEntity {

    @IsNotEmpty()
    @IsString()
        assessment_name: string;
		
    @IsNotEmpty()
    @IsInt()
        grade: number;
		
    @IsNotEmpty()
    @IsInt()
        studentId?: number;
			
    @IsNotEmpty()
    @IsInt()
        objectId?: number;

}