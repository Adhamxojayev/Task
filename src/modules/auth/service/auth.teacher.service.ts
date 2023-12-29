import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDto } from '../dto/login.dto';
import { bcryptHelper, jwtHelper } from '@utils/helper';
import { BaseResponse } from '@utils/base.response';
import { ServiceExceptions } from '@utils/exceptions/service.expection';
import { I_TOKEN } from '@utils/interface';
import { USER_ROLE } from '@utils/enums';
import { TOKEN } from '@utils/types';
import { UserRepository } from '../../user/repository/user.repository';

@Injectable()
export class AuthTeacherService {

    constructor(
        @InjectRepository(UserRepository)
        private readonly userRepository: UserRepository
    ) {}

    async login(dto: LoginDto): Promise<BaseResponse<I_TOKEN>> {

        try {

            const teacher = await this.userRepository.getUserByName(
                dto.username
            );

            if (!teacher || teacher.role == USER_ROLE.DIRECTOR || teacher.role == USER_ROLE.STUDENT) {

                return {
                    status: HttpStatus.BAD_REQUEST,
                    data: null,
                    message: 'Invalid name or password'
                };
            
            }

            if (!teacher) {

                return {
                    status: HttpStatus.BAD_REQUEST,
                    data: null,
                    message: 'Invalid name or password'
                };
            
            }

            const isValidPasswd = await bcryptHelper.isMatch(
                teacher.password,
                dto.password
            );
            if (!isValidPasswd) {

                return {
                    status: HttpStatus.BAD_REQUEST,
                    data: null,
                    message: 'Invalid name or password'
                };
            
            }

            const ACCESS_TOKEN = jwtHelper.sign(
                {   
                    id: teacher.id,
                    username: teacher.username,
                    role: USER_ROLE.TEACHER
                },
                {
                    expiresIn: '1d'
                }
            );

            const REFRESH_TOKEN = jwtHelper.sign(
                {
                    id: teacher.id,
                    username: teacher.username,
                    role: USER_ROLE.TEACHER
                },
                {
                    expiresIn: '15d'
                }
            );

            return {
                status: HttpStatus.OK,
                data: { access_token: ACCESS_TOKEN, refresh_token: REFRESH_TOKEN },
                message: 'OK'
            };
        
        } catch (err) {

            ServiceExceptions.handle(err, AuthTeacherService.name, 'login');
        
        }
    
    }

    async refreshToken(refreshToken: string): Promise<BaseResponse<I_TOKEN>> {

        try {

            const decodedToken = jwtHelper.verify(refreshToken) as TOKEN;
            if (decodedToken instanceof Error) {

                return {
                    status: HttpStatus.FORBIDDEN,
                    data: null,
                    message: 'Forbidden'
                };
            
            }

            const teacher = await this.userRepository.getUserByName(
                decodedToken.username
            );
            if (!teacher) {

                return {
                    status: HttpStatus.UNAUTHORIZED,
                    data: null,
                    message: 'UNAUTHORIZED'
                };
            
            }

            const ACCESS_TOKEN = jwtHelper.sign(
                { id: teacher.id, username: teacher.username, role: USER_ROLE.TEACHER },
                { expiresIn: '1d' }
            );

            return {
                status: HttpStatus.OK,
                data: { access_token: ACCESS_TOKEN, refresh_token: refreshToken },
                message: 'Token is renewed'
            };
        
        } catch (err) {

            ServiceExceptions.handle(err, AuthTeacherService.name, 'refreshToken');
        
        }
    
    }

}
