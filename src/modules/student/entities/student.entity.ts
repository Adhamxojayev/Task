import { Entity, OneToMany, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { GeneralEntity } from '@utils/base.entity';
import { GroupEntity } from '../../group/entities/group.entity';
import { AssessmentEntity } from 'src/modules/assessment/entities/assessment.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';

@Entity('students')
export class StudentEntity extends GeneralEntity {

  	@ManyToOne(() => GroupEntity, (group) => group.students)
  		group?: GroupEntity;

    @OneToMany(() => AssessmentEntity, (assessment) => assessment.student)
        assessments: AssessmentEntity[];
		
    @OneToOne(() => UserEntity, (user) => user.student, { onDelete: 'CASCADE', eager: true } )
    @JoinColumn()
        user: UserEntity;

}