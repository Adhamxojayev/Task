import {
    Body,
    Controller,
    HttpCode,
    Patch,
    Post,
    Req,
    Res
} from '@nestjs/common';
import { Response } from 'express';
import { LoginDto } from '../dto/login.dto';
import { Public } from '@dec/public.route.decorator';
import { AuthTeacherService } from '../service/auth.teacher.service';
import { Roles } from '@dec/roles.decorator';
import { USER_ROLE } from '@utils/enums';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('teacher')
@Controller('teacher')
export class AuthTeacherController {

    constructor(private readonly authTeacherService: AuthTeacherService) {}

    @Public()
    @HttpCode(200)
    @Post('/login')
    async login(@Body() dto: LoginDto, @Res() response: Response) {

        const res = await this.authTeacherService.login(dto);
        response.status(res.status).json(res);
    
    }

    @Roles(USER_ROLE.TEACHER)
    @HttpCode(200)
    @Patch('/refresh')
    async refreshToken(@Req() request: Request, @Res() response: Response) {

        const refreshToken = request.headers['refresh'];

        const res = await this.authTeacherService.refreshToken(refreshToken);
        response.status(res.status).json(res);
    
    }

}
