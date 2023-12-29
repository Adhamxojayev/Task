import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AssessmentRepository } from '../repository/assessment.repository';
import { BaseResponse } from '@utils/base.response';
import { ServiceExceptions } from '@utils/exceptions/service.expection';
import { CreateAssessmentDto } from '../dto/create.assessment.dto';
import { AssessmentEntity } from '../entities/assessment.entity';
import { USER_ROLE } from '@utils/enums';
import { UpdateAssessmentDto } from '../dto/update.assessment.dto';
import { StudentRepository } from '../../student/repository/student.repository';
import { ObjectRepository } from 'src/modules/object/repository/object.repository';

@Injectable()
export class AssessmentService {

    constructor(
        @InjectRepository(AssessmentRepository)
        private readonly assessmentRepository: AssessmentRepository,
        @InjectRepository(StudentRepository)
        private readonly studentRepository: StudentRepository,
        @InjectRepository(ObjectRepository)
        private readonly objectRepository: ObjectRepository
    ) {}

    async findAll(): Promise<BaseResponse<AssessmentEntity[]>> {

        try {

            const data = await this.assessmentRepository.findAll();

            return { status: HttpStatus.OK, data: data, message: 'OK' };
        
        } catch (err) {

            ServiceExceptions.handle(err, AssessmentService.name, 'findAll');
        
        }
    
    }

    async create( user: any, dto: CreateAssessmentDto ): Promise<BaseResponse<AssessmentEntity | any>> {

        try {

            const foundStudent = await this.studentRepository.getStudentById(dto.studentId);
            if (!foundStudent) {

                return {
                    status: HttpStatus.NOT_FOUND,
                    data: null,
                    message: 'Student not found'
                };
            
            }

            const foundObject = await this.objectRepository.getObjectById(dto.objectId);
            if (!foundObject) {

                return {
                    status: HttpStatus.NOT_FOUND,
                    data: null,
                    message: 'Object not found'
                };
            
            }
            
            const foundTeacher = await this.studentRepository.findTeacher(user.id, dto.studentId);

            if(!foundTeacher) {
                
                return {
                    
                    status: HttpStatus.FORBIDDEN,
                    message: 'You cannot rate',
                    data: null
                    
                };
                
            }
            
            const assessment = await this.assessmentRepository.createAssessmentStudent(user.id, dto);
            return {
                status: HttpStatus.CREATED,
                message: 'created',
                data: assessment 
            };
        
        } catch (err) {

            ServiceExceptions.handle(err, AssessmentService.name, 'create');
        
        }
    
    }

    // async update( id: number, dto: UpdateAssessmentDto ): Promise<BaseResponse<AssessmentEntity>> {

    //     try {

    //         const student = await this.studentRepository.getStudentById(id);
    //         if (!student) {

    //             return {
    //                 status: HttpStatus.NOT_FOUND,
    //                 data: null,
    //                 message: 'Student not found'
    //             };
            
    //         }

    //         const user = await this.userRepository.getUserByName(
    //             dto.username
    //         );
    //         if (user) {

    //             return {
    //                 status: HttpStatus.BAD_REQUEST,
    //                 data: null,
    //                 message: 'This username already exists'
    //             };
            
    //         }

    //         const data = await this.studentRepository.updateStudent(id, dto);

    //         return {
    //             status: HttpStatus.OK,
    //             message: 'updated',
    //             data: data
    //         };
        
    //     } catch (err) {

    //         ServiceExceptions.handle(err, AssessmentService.name, 'update');
        
    //     }
    
    // }

    async remove( id: number ): Promise<BaseResponse<AssessmentEntity>> {

        try {

            const assessment = await this.assessmentRepository.deleteAssessment(id);

            return {
                status: HttpStatus.OK,
                message: 'deleted',
                data: assessment
            };
        
        } catch (err) {

            ServiceExceptions.handle(err, AssessmentService.name, 'remove');
        
        }
    
    }

}
