import { TypeOrmExModule } from '@dec/typeorm-ex.module';
import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AssessmentController } from './controller/assessment.controller';
import { AssessmentRepository } from './repository/assessment.repository';
import { AssessmentService } from './service/assessment.service';
import { StudentRepository } from '../student/repository/student.repository';
import { ObjectRepository } from '../object/repository/object.repository';

@Module({

    imports: [TypeOrmExModule.forCustomRepository([AssessmentRepository, StudentRepository, ObjectRepository])],
    controllers: [AssessmentController],
    providers: [JwtService, AssessmentService],
    exports: [AssessmentService]

})
export class AssessmentModule {}
