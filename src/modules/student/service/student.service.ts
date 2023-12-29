import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentRepository } from '../repository/student.repository';
import { BaseResponse } from '@utils/base.response';
import { ServiceExceptions } from '@utils/exceptions/service.expection';
import { StudentEntity } from '../entities/student.entity';
import { UserRepository } from 'src/modules/user/repository/user.repository';
import { USER_ROLE } from '@utils/enums';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { CreateStudentDto } from '../dto/create.student.dto';
import { bcryptHelper } from '@utils/helper';
import { UpdateStudentDto } from '../dto/update.student.dto';
import { AssessmentEntity } from 'src/modules/assessment/entities/assessment.entity';

@Injectable()
export class StudentService {

    constructor(
        @InjectRepository(StudentRepository)
        private readonly studentRepository: StudentRepository,
        @InjectRepository(UserRepository)
        private readonly userRepository: UserRepository
    ) {}

    async findAll(): Promise<BaseResponse<UserEntity[]>> {

        try {

            const data = await this.userRepository.getUserByRole(USER_ROLE.STUDENT);
            return { status: HttpStatus.OK, data:  data, message: 'OK' };
        
        } catch (err) {

            ServiceExceptions.handle(err, StudentService.name, 'findAll');
        
        }
    
    }

    async findGrades(user): Promise<BaseResponse<AssessmentEntity[] | any>> {

        try {

            const data = await this.studentRepository.getStudentGrades(user.id);
            return { status: HttpStatus.OK, data: data, message: 'OK' };
        
        } catch (err) {

            ServiceExceptions.handle(err, StudentService.name, 'findGrades');
        
        }
    
    }

    async create( dto: CreateStudentDto ): Promise<BaseResponse<StudentEntity>> {

        try {

            const user = await this.userRepository.getUserByName(
                dto.username
            );
            if (user) {

                return {
                    status: HttpStatus.BAD_REQUEST,
                    data: null,
                    message: 'This username already exists'
                };
            
            }
            
            dto.password = await bcryptHelper.hash(dto.password);

            const student = await this.studentRepository.createUser(dto);

            return {
                status: HttpStatus.CREATED,
                message: 'created',
                data: student
            };
        
        } catch (err) {

            ServiceExceptions.handle(err, StudentService.name, 'create');
        
        }
    
    }

    async update( id: number, dto: UpdateStudentDto ): Promise<BaseResponse<UserEntity>> {

        try {

            const student = await this.studentRepository.getStudentById(id);
            if (!student) {

                return {
                    status: HttpStatus.NOT_FOUND,
                    data: null,
                    message: 'Student not found'
                };
            
            }

            const user = await this.userRepository.getUserByName(
                dto.username
            );
            if (user) {

                return {
                    status: HttpStatus.BAD_REQUEST,
                    data: null,
                    message: 'This username already exists'
                };
            
            }

            const data = await this.studentRepository.updateStudent(id, dto);

            return {
                status: HttpStatus.OK,
                message: 'updated',
                data: data
            };
        
        } catch (err) {

            ServiceExceptions.handle(err, StudentService.name, 'update');
        
        }
    
    }

    async remove( id: number ): Promise<BaseResponse<UserEntity>> {

        try {

            const group = await this.studentRepository.getStudentById(id);
            if (!group) {

                return {
                    status: HttpStatus.NOT_FOUND,
                    data: null,
                    message: 'Student not found'
                };
            
            }

            const deletedStudent = await this.studentRepository.deleteStudent(id);

            return {
                status: HttpStatus.OK,
                message: 'deleted',
                data: deletedStudent
            };
        
        } catch (err) {

            ServiceExceptions.handle(err, StudentService.name, 'remove');
        
        }
    
    }

}
