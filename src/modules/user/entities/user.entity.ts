import { Entity, Column } from 'typeorm';
import { GeneralEntity } from '@utils/base.entity';
import { USER_ROLE } from '@utils/enums';

@Entity('users')
export class UserEntity extends GeneralEntity {

    @Column({ type: 'varchar', name: 'firstname', nullable: true })
        firstname: string;

    @Column({ type: 'varchar', name: 'lastname', nullable: true })
        lastname: string;

    @Column({ type: 'varchar', name: 'username', unique: true })
        username: string;

    @Column({ type: 'varchar', name: 'password' })
        password: string;

    @Column({ type: 'enum', name: 'role', enum: USER_ROLE })
        role: USER_ROLE;

    toJSON() {

        delete this.password;
        return this;
    
    }

}
