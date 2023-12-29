import { Entity, Column, ManyToMany, OneToMany, OneToOne, JoinTable, JoinColumn } from 'typeorm';
import { GeneralEntity } from '@utils/base.entity';
import { StudentEntity } from 'src/modules/student/entities/student.entity';
import { ObjectEntity } from 'src/modules/object/entities/object.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';

@Entity('groups')
export class GroupEntity extends GeneralEntity {

    @Column({ type: 'varchar', name: 'group_name' })
        group_name: string;

    @OneToMany(() => StudentEntity, (student) => student.group)
  		students?: StudentEntity[];
	
    @ManyToMany(() => ObjectEntity, (object) => object.groups, { cascade: true })
    @JoinTable({ name: 'group_object' })
        objects: ObjectEntity[];
    
    @OneToOne(() => UserEntity, (user) => user.group, { onDelete: 'CASCADE', eager: true } )
    @JoinColumn({ name: 'teacherId' }) 
        user: UserEntity;

}