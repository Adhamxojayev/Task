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
import { AuthService } from '../service/auth.service';
import { LoginDto } from '../dto/login.dto';
import { SignUpDto } from '../dto/register.dto';
import { USER_ROLE } from '@utils/enums';
import { Roles } from '@dec/roles.decorator';
import { Public } from '@dec/public.route.decorator';

@Controller()
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Public()
    @HttpCode(200)
    @Post('/login')
    async login(@Body() dto: LoginDto, @Res() response: Response) {

        const res = await this.authService.login(dto);
        response.status(res.status).json(res);
    
    }

    @Public()
    @Post('/signup')
    async signUp(@Body() dto: SignUpDto, @Res() response: Response) {

        const res = await this.authService.signUp(dto);
        response.status(res.status).json(res);
    
    }

    @Roles(USER_ROLE.STUDENT)
    @HttpCode(200)
    @Patch('/refresh')
    async refreshToken(@Req() request: Request, @Res() response: Response) {

        const refreshToken = request.headers['refresh'];

        const res = await this.authService.refreshToken(refreshToken);
        response.status(res.status).json(res);
    
    }

}
