import { Public } from '@dec/public.route.decorator';
import { Roles } from '@dec/roles.decorator';
import {
    Body,
    Controller,
    HttpCode,
    Patch,
    Post,
    Req,
    Res
} from '@nestjs/common';
import { USER_ROLE } from '@utils/enums';
import { Response } from 'express';
import { LoginDto } from '../dto/login.dto';
import { AuthDirectorService } from '../service/auth.director.service';

@Controller('director')
export class AuthDirectortroller {

    constructor(private readonly authDirectorService: AuthDirectorService) {}

    @Public()
    @HttpCode(200)
    @Post('/login')
    async login(@Body() dto: LoginDto, @Res() response: Response) {

        const res = await this.authDirectorService.login(dto);
        response.status(res.status).json(res);
    
    }

    @Roles(USER_ROLE.DIRECTOR)
    @HttpCode(200)
    @Patch('/refresh')
    async refreshToken(@Req() request: Request, @Res() response: Response) {

        const refreshToken = request.headers['refresh'];

        const res = await this.authDirectorService.refreshToken(refreshToken);
        response.status(res.status).json(res);
    
    }

}
