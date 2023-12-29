import { Module } from '@nestjs/common';
import { TypeOrmExModule } from '@dec/typeorm-ex.module';
import { JwtService } from '@nestjs/jwt';
import { StudentRepository } from './repository/student.repository';
import { StudentService } from './service/student.service';
import { StudentController } from './controller/student.controller';
import { UserRepository } from '../user/repository/user.repository';

@Module({
    imports: [
        TypeOrmExModule.forCustomRepository([
            StudentRepository,
            UserRepository
        ])
    ],
    controllers: [StudentController],
    providers: [JwtService, StudentService],
    exports: [StudentService]
})
export class StudentModule {}