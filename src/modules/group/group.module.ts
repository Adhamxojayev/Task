import { Module } from '@nestjs/common';
import { TypeOrmExModule } from '@dec/typeorm-ex.module';
import { JwtService } from '@nestjs/jwt';
import { GroupRepository } from './repository/group.repository';
import { GroupService } from './service/group.service';
import { GroupController } from './controller/group.controller';
import { UserRepository } from '../user/repository/user.repository';
import { StudentRepository } from '../student/repository/student.repository';

@Module({
    imports: [
        TypeOrmExModule.forCustomRepository([
            GroupRepository,
            UserRepository,
            StudentRepository
        ])
    ],
    controllers: [GroupController],
    providers: [JwtService, GroupService],
    exports: [GroupService]
})
export class GroupModule {}