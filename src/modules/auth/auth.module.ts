import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmExModule } from 'src/decorators/typeorm-ex.module';
import { UserRepository } from '../user/repository/user.repository';
import { AuthController } from './controller/auth.controller';
import { AuthDirectortroller } from './controller/auth.director.controller';
import { AuthTeacherController } from './controller/auth.teacher.controller';
import { AuthDirectorService } from './service/auth.director.service';
import { AuthService } from './service/auth.service';
import { AuthTeacherService } from './service/auth.teacher.service';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
    
    imports: [
        TypeOrmExModule.forCustomRepository([UserRepository]),
        JwtModule.register({}),
        PassportModule
    ],
    controllers: [AuthController, AuthTeacherController, AuthDirectortroller],
    providers: [
        AuthService,
        JwtStrategy,
        AuthTeacherService,
        AuthDirectorService
    ]

})
export class AuthModule {}
