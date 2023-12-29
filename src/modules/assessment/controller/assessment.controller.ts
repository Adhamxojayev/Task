import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req, Res } from '@nestjs/common';
import { Response } from 'express';
import { AssessmentService } from '../service/assessment.service';
import { Roles } from '@dec/roles.decorator';
import { USER_ROLE } from '@utils/enums';
import { CreateAssessmentDto } from '../dto/create.assessment.dto';
import { ApiTags } from '@nestjs/swagger';
import { iReq } from '@utils/interface';

@ApiTags('assessment')
@Controller('assessment')
export class AssessmentController {

    constructor(private readonly assessmentService: AssessmentService) {}

    @Roles(USER_ROLE.TEACHER)
    @Get()
    async findAll(@Req() req: iReq & { user: any }, @Res() response: Response) {

        const res = await this.assessmentService.findAll();
        response.status(res.status).json(res);
    
    }

    @Roles(USER_ROLE.TEACHER)
    @Post()
    async create(@Req() req: iReq & { user: any }, @Body() dto: CreateAssessmentDto, @Res() response: Response) {

        const res = await this.assessmentService.create(req.user, dto);
        response.status(res.status).json(res);
    
    }

    @Roles(USER_ROLE.DIRECTOR, USER_ROLE.TEACHER)
    @Delete(':id')
    async remove(@Req() req: iReq & { user: any }, @Param('id', ParseIntPipe) id: number, @Res() response: Response) {

        const res = await this.assessmentService.remove(id);
        response.status(res.status).json(res);
    
    }

}
