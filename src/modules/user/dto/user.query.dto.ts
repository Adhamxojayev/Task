import { QueryDto } from '@utils/dto/query.dto';
import { IsOptional } from 'class-validator';

export class UserQueryDto extends QueryDto {

    @IsOptional()
        name?: string;

}
