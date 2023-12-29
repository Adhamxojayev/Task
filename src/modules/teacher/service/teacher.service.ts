import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TeacherRepository } from '../repository/teacher.repository';
import { GroupEntity } from 'src/modules/group/entities/group.entity';
import { BaseResponse } from '@utils/base.response';
import { ServiceExceptions } from '@utils/exceptions/service.expection';
import { GroupRepository } from 'src/modules/group/repository/group.repository';

@Injectable()
export class TeacherService {

    constructor(
        @InjectRepository(TeacherRepository)
        private readonly teacherRepository: TeacherRepository,
        @InjectRepository(GroupRepository)
        private readonly groupRepository: GroupRepository
    ) {}
    
    async findAll(user): Promise<BaseResponse<GroupEntity[]>> {

        try {

            const data = await this.groupRepository.findAllByTeacher(user.id);

            return { status: HttpStatus.OK, data: data, message: 'OK' };
        
        } catch (err) {

            ServiceExceptions.handle(err, TeacherService.name, 'findAll');
        
        }

    }

}
