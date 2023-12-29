import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { ObjectService } from '../service/object.service';
import { Roles } from '@dec/roles.decorator';
import { USER_ROLE } from '@utils/enums';
import { UpdateObjectDto } from '../dto/update.object.dto';
import { CreateObjectDto } from '../dto/create.object.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('object')
@Controller('object')
export class ObjectController {

    constructor(private readonly objectService: ObjectService) {}

    @ApiBearerAuth()
    @Roles(USER_ROLE.DIRECTOR)
    @Get()
    async findAll(@Res() response: Response) {

        const res = await this.objectService.findAll();
        response.status(res.status).json(res);
    
    }

    @ApiBearerAuth()
    @Roles(USER_ROLE.DIRECTOR)
    @Post()
    async create(@Body() dto: CreateObjectDto, @Res() response: Response) {

        const res = await this.objectService.create(dto);
        response.status(res.status).json(res);
    
    }

    @ApiBearerAuth()
    @Roles(USER_ROLE.DIRECTOR)
    @Patch(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateObjectDto, @Res() response: Response) {

        const res = await this.objectService.update(id, dto);
        response.status(res.status).json(res);
    
    }

    @ApiBearerAuth()
    @Roles(USER_ROLE.DIRECTOR)
    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number, @Res() response: Response) {

        const res = await this.objectService.remove(id);
        response.status(res.status).json(res);
    
    }

}
