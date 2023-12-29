import { Controller, Get, Req, Res } from '@nestjs/common';
import { Response } from 'express';
import { TeacherService } from '../service/teacher.service';
import { USER_ROLE } from '@utils/enums';
import { Roles } from '@dec/roles.decorator';
import { iReq } from '@utils/interface';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('teacher')
@Controller('teacher')
export class TeacherController {

    constructor(private readonly teacherService: TeacherService) {}

    @Roles(USER_ROLE.TEACHER)
    @Get('my/groups')
    async findAll( @Req() req: iReq & { user: any }, @Res() response: Response) {

        const res = await this.teacherService.findAll(req.user);
        response.status(res.status).json(res);
    
    }

}
