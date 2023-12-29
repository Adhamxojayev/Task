import { TypeOrmExModule } from '@dec/typeorm-ex.module';
import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ObjectController } from './controller/object.controller';
import { ObjectRepository } from './repository/object.repository';
import { ObjectService } from './service/object.service';
import { GroupRepository } from '../group/repository/group.repository';

@Module({

    imports: [TypeOrmExModule.forCustomRepository([ObjectRepository, GroupRepository])],
    controllers: [ObjectController],
    providers: [JwtService, ObjectService],
    exports: [ObjectService]

})
export class ObjectModule {}
