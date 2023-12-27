import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../repository/user.repository';
import { BaseResponse } from '@utils/base.response';
import { ServiceExceptions } from '@utils/exceptions/service.expection';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserRepository)
        private readonly userRepository: UserRepository
    ) {}

    async getUserByUsername(username: string): Promise<BaseResponse<UserEntity>> {

        try {

            const user = await this.userRepository.getUserByName(username);

            return { status: HttpStatus.OK, data: user, message: 'OK' };
        
        } catch (err) {

            ServiceExceptions.handle(err, UserService.name, 'getUserByUsername');
        
        }
    
    }

    async getUserById(id: number): Promise<BaseResponse<UserEntity>> {

        try {

            const user = await this.userRepository.getUserById(id);
            if (!user) {

                return {
                    status: HttpStatus.NOT_FOUND,
                    data: null,
                    message: 'User is not found'
                };
            
            }

            return { status: HttpStatus.OK, data: user, message: 'OK' };
        
        } catch (err) {

            return ServiceExceptions.handle(err, UserService.name, 'getUserById');
        
        }
    
    }

}
