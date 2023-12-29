import { IsNotEmpty, IsString } from 'class-validator';
import { BaseEntity } from 'typeorm';

export class CreateGroupDto extends BaseEntity {

    @IsNotEmpty()
    @IsString()
        groupName: string;

}