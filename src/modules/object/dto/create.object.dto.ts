import { IsNotEmpty, IsString } from 'class-validator';
import { BaseEntity } from 'typeorm';

export class CreateObjectDto extends BaseEntity {

    @IsNotEmpty()
    @IsString()
        objectName: string;

}