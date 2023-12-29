import { Repository } from 'typeorm';
import { CustomRepository } from '@dec/typeorm-ex.decorator';
import { DbExceptions } from '@utils/exceptions/dbException';
import { UserEntity } from 'src/modules/user/entities/user.entity';

@CustomRepository(UserEntity)
export class TeacherRepository extends Repository<UserEntity> {}