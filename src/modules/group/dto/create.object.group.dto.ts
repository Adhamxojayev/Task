import { IsArray, IsNotEmpty } from 'class-validator';
import { BaseEntity } from 'typeorm';

export class CreateObjectGroupDto extends BaseEntity {

    @IsNotEmpty()
    @IsArray()
        objectId: number[];

}