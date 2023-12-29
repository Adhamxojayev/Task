import { Module } from '@nestjs/common';
import { TypeOrmExModule } from '@dec/typeorm-ex.module';
import { UserRepository } from './repository/user.repository';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { JwtService } from '@nestjs/jwt';

@Module({
    imports: [
        TypeOrmExModule.forCustomRepository([
            UserRepository
        ])
    ],
    controllers: [UserController],
    providers: [JwtService, UserService],
    exports: [UserService]
})
export class UserModule {}
