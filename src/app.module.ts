import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { dataSource } from '@utils/dataSource';
import { configuration } from '@utils/db.config';
// import { SeedModule } from './seed/seed.module';
import { AuthModule } from './modules/auth/auth.module';
import { RolesGuard } from './modules/auth/guard/roles.guard';
import { AuthGuard } from './modules/auth/guard/auth.guard';

@Module({
    imports: [
        TypeOrmModule.forRoot(configuration.getTypeOrmConfig()),
        // SeedModule,
        AuthModule
    ],
    controllers: [],
    providers: [
        {
            provide: DataSource,
            useFactory: async () => {

                const logger = new Logger('DataSource');
                try {

                    await dataSource.initialize();
                    logger.log('Data Source has been initialized');
                    return dataSource;
                
                } catch (e) {

                    logger.error(`Error during Data Source initialization: [${e}]`);
                
                }
            
            }
        },
        {
            provide: APP_GUARD,
            useClass: AuthGuard
        },
        {
            provide: APP_GUARD,
            useClass: RolesGuard
        },
        JwtService
    ]
})
export class AppModule {}
