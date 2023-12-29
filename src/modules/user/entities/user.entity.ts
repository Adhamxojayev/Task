import { Entity, Column, OneToOne, JoinTable } from 'typeorm';
import { GeneralEntity } from '@utils/base.entity';
import { USER_ROLE } from '@utils/enums';
import { GroupEntity } from '../../group/entities/group.entity';
import { StudentEntity } from '../../student/entities/student.entity';

@Entity('users')
export class UserEntity extends GeneralEntity {

    @Column({ type: 'varchar', name: 'username', unique: true })
        username: string;

    @Column({ type: 'varchar', name: 'password' })
        password: string;

    @Column({ type: 'enum', name: 'role', enum: USER_ROLE })
        role: USER_ROLE;
    
    @OneToOne(() => GroupEntity, (group) => group.user, { onDelete: 'CASCADE' } )
        group: GroupEntity;
    
    @OneToOne(() => StudentEntity, (student) => student.user, { onDelete: 'CASCADE' } )
        student: StudentEntity;

    toJSON() {

        delete this.password;
        return this;
    
    }

}
