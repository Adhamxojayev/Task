import { IsInt, IsNotEmpty } from 'class-validator';
import { BaseEntity } from 'typeorm';

export class CreateTeacherGroupDto extends BaseEntity {

    @IsNotEmpty()
    @IsInt()
        teacherId: number;

}