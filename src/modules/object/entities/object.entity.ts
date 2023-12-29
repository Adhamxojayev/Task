import { Entity, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { GeneralEntity } from '@utils/base.entity';
import { GroupEntity } from '../../group/entities/group.entity';
import { AssessmentEntity } from '../../assessment/entities/assessment.entity';

@Entity('objects')
export class ObjectEntity extends GeneralEntity {

    @Column({ type: 'varchar', name: 'object_name' })
        objectName: string;
		
    @ManyToMany(() => GroupEntity, (group) => group.objects)
        groups: GroupEntity[];
	
    @OneToMany(() => AssessmentEntity, (assessment) => assessment.object)
        assessments: AssessmentEntity[];

}