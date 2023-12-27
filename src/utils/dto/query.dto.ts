import { IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class QueryDto {

    @ApiProperty({ type: 'number', default: 1, minimum: 1, required: false })
    @IsOptional()
    @Transform((data) => parseInt(data.value))
    @IsNumber()
        page? = 1;

    @ApiProperty({ type: 'number', default: 10, minimum: 1, required: false })
    @IsOptional()
    @Transform((data) => parseInt(data.value))
    @IsNumber()
        limit? = 10;

}
