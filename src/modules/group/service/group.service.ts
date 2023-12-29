import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupRepository } from '../repository/group.repository';
import { BaseResponse } from '@utils/base.response';
import { ServiceExceptions } from '@utils/exceptions/service.expection';
import { GroupEntity } from '../entities/group.entity';
import { CreateGroupDto } from '../dto/create.group.dto';
import { UpdateGroupDto } from '../dto/update.group.dto';
import { CreateObjectGroupDto } from '../dto/create.object.group.dto';
import { CreateTeacherGroupDto } from '../dto/create.teacher.group.dto';
import { UserRepository } from '../../user/repository/user.repository';
import { USER_ROLE } from '@utils/enums';
import { StudentRepository } from 'src/modules/student/repository/student.repository';
import { CreateStudentGroupDto } from '../dto/create.student.group.dto';

@Injectable()
export class GroupService {

    constructor(
        @InjectRepository(GroupRepository)
        private readonly groupRepository: GroupRepository,
        @InjectRepository(UserRepository)
        private readonly userRepository: UserRepository,
        @InjectRepository(StudentRepository)
        private readonly studentRepository: StudentRepository
    ) {}
    
    async findAll(): Promise<BaseResponse<GroupEntity[]>> {

        try {

            const data = await this.groupRepository.findAll();
            return { status: HttpStatus.OK, data:  data, message: 'OK' };
        
        } catch (err) {

            ServiceExceptions.handle(err, GroupService.name, 'findAll');
        
        }
    
    }

    async create( dto: CreateGroupDto ): Promise<BaseResponse<GroupEntity>> {

        try {

            const group = await this.groupRepository.getGroupByName(
                dto.groupName
            );
            if (group) {

                return {
                    status: HttpStatus.BAD_REQUEST,
                    data: null,
                    message: 'This group name already exists'
                };
            
            }

            const newGroup = await this.groupRepository.createGroup(dto);

            return {
                status: HttpStatus.CREATED,
                message: 'created',
                data: newGroup
            };
        
        } catch (err) {

            ServiceExceptions.handle(err, GroupService.name, 'create');
        
        }
    
    }

    async createGroupObject( id: number, dto: CreateObjectGroupDto ): Promise<BaseResponse<GroupEntity>> {

        try {

            const group = await this.groupRepository.getGroupById(id);
            if (!group) {

                return {
                    status: HttpStatus.NOT_FOUND,
                    data: null,
                    message: 'Group not found'
                };
            
            }

            const newGroup = await this.groupRepository.createGroupObject(id, dto);

            return {
                status: HttpStatus.CREATED,
                message: 'created',
                data: newGroup
            };
        
        } catch (err) {

            ServiceExceptions.handle(err, GroupService.name, 'createGroupObject');
        
        }
    
    }

    async createGroupTeacher( id: number, dto: CreateTeacherGroupDto ): Promise<BaseResponse<GroupEntity>> {

        try {

            const group = await this.groupRepository.getGroupById(id);
            if (!group) {

                return {
                    status: HttpStatus.NOT_FOUND,
                    data: null,
                    message: 'Group not found'
                };
            
            }

            const teacher = await this.userRepository.getUserByRoleAndById(dto.teacherId, USER_ROLE.TEACHER);
            if (!teacher) {

                return {
                    status: HttpStatus.NOT_FOUND,
                    data: null,
                    message: 'Teacher not found'
                };
            
            }

            const groupAddTeacher = await this.groupRepository.createGroupTeacher(id, dto);

            return {
                status: HttpStatus.CREATED,
                message: 'a teacher was added to the group',
                data: groupAddTeacher
            };
        
        } catch (err) {

            ServiceExceptions.handle(err, GroupService.name, 'createGroupTeacher');
        
        }
    
    }

    async createGroupStudent( id: number, dto: CreateStudentGroupDto ): Promise<BaseResponse<GroupEntity>> {

        try {

            const group = await this.groupRepository.getGroupById(id);
            if (!group) {

                return {
                    status: HttpStatus.NOT_FOUND,
                    data: null,
                    message: 'Group not found'
                };
            
            }

            const student = await this.studentRepository.getStudentById(dto.studentId);
            if (!student) {

                return {
                    status: HttpStatus.NOT_FOUND,
                    data: null,
                    message: 'Student not found'
                };
            
            }

            const groupAddTeacher = await this.groupRepository.createGroupStudent(id, dto);

            return {
                status: HttpStatus.CREATED,
                message: 'a student was added to the group',
                data: groupAddTeacher
            };
        
        } catch (err) {

            ServiceExceptions.handle(err, GroupService.name, 'createGroupTeacher');
        
        }
    
    }

    async update( id: number, dto: UpdateGroupDto ): Promise<BaseResponse<GroupEntity>> {

        try {

            const group = await this.groupRepository.getGroupById(id);
            if (!group) {

                return {
                    status: HttpStatus.NOT_FOUND,
                    data: null,
                    message: 'Group not found'
                };
            
            }

            const newGroup = await this.groupRepository.updateGroup(id, dto);

            return {
                status: HttpStatus.OK,
                message: 'updated',
                data: newGroup
            };
        
        } catch (err) {

            ServiceExceptions.handle(err, GroupService.name, 'update');
        
        }
    
    }

    async remove( id: number ): Promise<BaseResponse<GroupEntity>> {

        try {

            const group = await this.groupRepository.getGroupById(id);
            if (!group) {

                return {
                    status: HttpStatus.NOT_FOUND,
                    data: null,
                    message: 'Group not found'
                };
            
            }

            const deletedGroup = await this.groupRepository.deleteGroup(id);

            return {
                status: HttpStatus.OK,
                message: 'deleted',
                data: deletedGroup
            };
        
        } catch (err) {

            ServiceExceptions.handle(err, GroupService.name, 'remove');
        
        }
    
    }

}