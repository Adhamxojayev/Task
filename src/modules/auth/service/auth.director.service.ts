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
export class AuthDirectorService {

    constructor(
        @InjectRepository(UserRepository)
        private readonly userRepository: UserRepository
    ) {}

    async login(dto: LoginDto): Promise<BaseResponse<I_TOKEN>> {

        try {

            const director = await this.userRepository.getUserByName(
                dto.username
            );

            if (!director || director.role == USER_ROLE.TEACHER || director.role == USER_ROLE.STUDENT) {

                return {
                    status: HttpStatus.BAD_REQUEST,
                    data: null,
                    message: 'Invalid name or password'
                };
            
            }

            if (!director) {

                return {
                    status: HttpStatus.BAD_REQUEST,
                    data: null,
                    message: 'Invalid name or password'
                };
            
            }

            const isValidPasswd = await bcryptHelper.isMatch(
                director.password,
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
                    username: director.username,
                    role: USER_ROLE.DIRECTOR
                },
                {
                    expiresIn: '1d'
                }
            );

            const REFRESH_TOKEN = jwtHelper.sign(
                {
                    username: director.username,
                    role: USER_ROLE.DIRECTOR
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

            ServiceExceptions.handle(err, AuthDirectorService.name, 'login');
        
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

            const centre = await this.userRepository.getUserByName(
                decodedToken.username
            );
            if (!centre) {

                return {
                    status: HttpStatus.UNAUTHORIZED,
                    data: null,
                    message: 'UNAUTHORIZED'
                };
            
            }

            const ACCESS_TOKEN = jwtHelper.sign(
                { username: centre.username, role: USER_ROLE.DIRECTOR },
                { expiresIn: '1d' }
            );

            return {
                status: HttpStatus.OK,
                data: { access_token: ACCESS_TOKEN, refresh_token: refreshToken },
                message: 'Token is renewed'
            };
        
        } catch (err) {

            ServiceExceptions.handle(err, AuthDirectorService.name, 'refreshToken');
        
        }
    
    }

}
