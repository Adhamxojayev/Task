import { IsOptional, IsString } from 'class-validator';

export class QueryReportDto {

    @IsOptional()
    @IsString()
        name: string;

    @IsOptional()
    @IsString()
        group: string;
		
    @IsOptional()
    @IsString()
        subject: string;

}