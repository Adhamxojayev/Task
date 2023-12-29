import { Entity, Column, ManyToOne } from 'typeorm';
import { GeneralEntity } from '@utils/base.entity';
import { StudentEntity } from '../../student/entities/student.entity';
import { ObjectEntity } from '../../object/entities/object.entity';

@Entity('assessments')
export class AssessmentEntity extends GeneralEntity {

    @Column({ type: 'varchar', name: 'assessment_name' })
        assessment_name: string;

    @Column({ type: 'smallint', name: 'grade' })
        grade: number;
		
    @ManyToOne(() => StudentEntity, (student) => student.assessments )
        student: StudentEntity;

    @ManyToOne(() => ObjectEntity, (object) => object.assessments )
        object: ObjectEntity;

}