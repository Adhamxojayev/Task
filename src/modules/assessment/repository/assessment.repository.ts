import { Repository } from 'typeorm';
import { CustomRepository } from '@dec/typeorm-ex.decorator';
import { DbExceptions } from '@utils/exceptions/dbException';
import { AssessmentEntity } from '../entities/assessment.entity';
import { CreateAssessmentDto } from '../dto/create.assessment.dto';
import { UpdateAssessmentDto } from '../dto/update.assessment.dto';
import { StudentEntity } from 'src/modules/student/entities/student.entity';
import { ObjectEntity } from 'src/modules/object/entities/object.entity';

@CustomRepository(AssessmentEntity)
export class AssessmentRepository extends Repository<AssessmentEntity> {

	 async findAll (): Promise<AssessmentEntity[]> {

        try {

            const assessment = await this.find();

            return assessment;
            
        } catch (err) {

            DbExceptions.handle(err);
        
        }
    
    }

    async createAssessmentStudent (id: number, dto: CreateAssessmentDto): Promise<AssessmentEntity> {

        try {

            const object = await ObjectEntity.findOneBy({ id: dto.objectId });
            const student = await StudentEntity.findOneBy({ user: { id: dto.studentId } });
						
            const assessment = AssessmentEntity.create(
                { 
                    assessment_name: dto.assessment_name,
                    grade: dto.grade,
                    student: student,
                    object: object
								
                });
            await AssessmentEntity.save(assessment);

            return assessment;
						
        } catch (err) {

            DbExceptions.handle(err);
        
        }
    
    }

    // async updateAssessmentStudent (id: number, dto: UpdateAssessmentDto): Promise<AssessmentEntity> {

    //     try {

    //         const assessment = 1
            
    //     } catch (err) {

    //         DbExceptions.handle(err);
        
    //     }
    
    // }

    async deleteAssessment( id: number ): Promise<AssessmentEntity> {

        try {

            const {
                raw: [group]
            } = await AssessmentEntity.createQueryBuilder()
                .softDelete()
                .where('id = :id', { id })
                .returning('*')
                .execute();

            return group;
            
        } catch (err) {

            DbExceptions.handle(err);
        
        }
    
    }

    async getAssessmentById(id: number): Promise<AssessmentEntity> {

        try {

            return await this.findOneBy({ id });
        
        } catch (err) {

            DbExceptions.handle(err);
        
        }
    
    }

}
