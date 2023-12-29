import { Injectable, Logger } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { UserEntity } from '../modules/user/entities/user.entity';
import { USER_ROLE } from '@utils/enums';
import { bcryptHelper } from '@utils/helper';
import * as process from 'process';

@Injectable()
export class SeedService {

    #logger = new Logger(SeedService.name);

    constructor(private readonly entityManager: EntityManager) {}

    async perform(): Promise<void> {

        await this.entityManager.transaction(async (manager) => {

            await this.createUser(manager);
            this.#logger.log('Seed data complete.');
        
        });
    
    }

    async createUser(manager: EntityManager): Promise<void> {

        const users = await manager.find(UserEntity);

        if (users.length > 0) {

            this.#logger.log('user exists. Skipping seed...');
        
        } else {

            const user = new UserEntity();
            user.username = 'director';
            user.role = USER_ROLE.DIRECTOR;
            user.password = await bcryptHelper.hash('123456789');

            const record = manager.create(UserEntity, user);
            await manager.save(record);

            const teacher = new UserEntity();
            user.username = 'teacher';
            user.role = USER_ROLE.TEACHER;
            user.password = await bcryptHelper.hash('123456789');

            const data = manager.create(UserEntity, teacher);
            await manager.save(data);
        
        }
    
    }

}
