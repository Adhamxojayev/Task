import { Repository } from 'typeorm';
import { CustomRepository } from '@dec/typeorm-ex.decorator';
import { DbExceptions } from '@utils/exceptions/dbException';
import { StudentEntity } from '../entities/student.entity';
import { UserEntity } from '../../user/entities/user.entity';
import { CreateStudentDto } from '../dto/create.student.dto';
import { USER_ROLE } from '@utils/enums';
import { UpdateStudentDto } from '../dto/update.student.dto';
import { AssessmentEntity } from 'src/modules/assessment/entities/assessment.entity';

@CustomRepository(StudentEntity)
export class StudentRepository extends Repository<StudentEntity> {

	    async createUser(dto: CreateStudentDto): Promise<StudentEntity> {

        try {

            const user = new UserEntity();
            const student = new StudentEntity();

            user.username = dto.username;
            user.password = dto.password;
            user.role = USER_ROLE.STUDENT;

            student.user = user;
						
            await UserEntity.save(user);
            await StudentEntity.save(student);
						
            return student;

        } catch (err) {

            DbExceptions.handle(err);
        
        }
    
    }

    async getStudentById(id: number): Promise<StudentEntity> {

        try {

            return await this.findOneBy({ user:  { id } });

        } catch (err) {

            DbExceptions.handle(err);
        
        }
    
    }

		 async updateStudent( id: number, dto: UpdateStudentDto ): Promise<UserEntity> {

        try {

            const student = await UserEntity.findOneBy({ id });

            student.username = dto.username;
            await UserEntity.save(student);

            return student;
            
        } catch (err) {

            DbExceptions.handle(err);
        
        }
    
    }

    async deleteStudent( id: number ): Promise<UserEntity> {

        try {

            const student = await UserEntity.findOneBy({ id });
            await UserEntity.remove(student);

            return student;
            
        } catch (err) {

            DbExceptions.handle(err);
        
        }
    
    }

    async findTeacher( id: number, studentId: number ): Promise<UserEntity | boolean> {

        try {

            const [ student ] = await StudentEntity.find({ where: { user: { id: studentId } }, relations: { group: true } });
            const teacher = student.group.user;
						
            if(!teacher || teacher.id != id) {

                return false;
							
            }

            return true;
            
        } catch (err) {

            DbExceptions.handle(err);
        
        }
    
    }

    async getStudentGrades( id: number ): Promise<AssessmentEntity[]> {

        try {
            
            const student = await StudentEntity.findOneBy({ user: { id: id } });
            const grades = await AssessmentEntity.find( { where: { student: { id: student.id } } } );
            
            return grades;
            
        } catch (err) {

            DbExceptions.handle(err);
        
        }
    
    }

}