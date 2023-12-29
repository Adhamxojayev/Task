import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

const logger = new Logger('Main');

async function bootstrap() {

    const app = await NestFactory.create(AppModule);
    app.enableCors({
        origin: '*',
        methods: '*',
        preflightContinue: false,
        optionsSuccessStatus: 204,
        credentials: true
    });

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true
        })
    );

    const config = new DocumentBuilder()
        .setTitle('Task')
        .setDescription('Task')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('doc', app, document);

    await app.listen(process.env['APP_PORT']);

}

bootstrap()
    .then(() => {

        logger.log(`Server is running on port: [${process.env['APP_PORT']}]`);
    
    })
    .catch((err) => {

        logger.log(`Error is occurred during initialization the server: [${err}]`);
    
    });
