import { TypeOrmExModule } from '@dec/typeorm-ex.module';
import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TeacherController } from './controller/teacher.controller';
import { TeacherRepository } from './repository/teacher.repository';
import { TeacherService } from './service/teacher.service';
import { GroupRepository } from '../group/repository/group.repository';

@Module({

    imports: [TypeOrmExModule.forCustomRepository([TeacherRepository, GroupRepository])],
    controllers: [TeacherController],
    providers: [JwtService, TeacherService],
    exports: [TeacherService]

})
export class TeacherModule {}
