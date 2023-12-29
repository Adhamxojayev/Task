import { IsInt, IsNotEmpty } from 'class-validator';
import { BaseEntity } from 'typeorm';

export class CreateStudentGroupDto extends BaseEntity {

    @IsNotEmpty()
    @IsInt()
        studentId: number;

}