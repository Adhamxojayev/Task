import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { CustomRepository } from '@dec/typeorm-ex.decorator';
import { DbExceptions } from '@utils/exceptions/dbException';
import { SignUpDto } from '../../auth/dto/register.dto';
import { USER_ROLE } from '@utils/enums';

@CustomRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {

    async getUserByName(name: string): Promise<UserEntity> {

        try {

            return await UserEntity.findOne({
                where: {
                    username: name
                }
            });
        
        } catch (err) {

            DbExceptions.handle(err);
        
        }
    
    }

    async createUser(dto): Promise<UserEntity> {

        try {

            return await this.create({
                username: dto.username,
                password: dto.password,
                role: dto.role
            }).save();
        
        } catch (err) {

            DbExceptions.handle(err);
        
        }
    
    }

    async getUserById(id: number): Promise<UserEntity> {

        try {

            return await this.findOneBy({ id });
        
        } catch (err) {

            DbExceptions.handle(err);
        
        }
    
    }

    async getUserByRole(role: USER_ROLE): Promise<UserEntity[]> {

        try {

            return await this.find({ where: { role: role } } );
        
        } catch (err) {

            DbExceptions.handle(err);
        
        }
    
    }

    async getUserByRoleAndById(id: number, role: USER_ROLE): Promise<UserEntity> {

        try {

            return await this.findOne({ where: { role: role, id: id } } );
        
        } catch (err) {

            DbExceptions.handle(err);
        
        }
    
    }

}
