import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { GroupService } from '../service/group.service';
import { Roles } from '@dec/roles.decorator';
import { USER_ROLE } from '@utils/enums';
import { CreateGroupDto } from '../dto/create.group.dto';
import { UpdateGroupDto } from '../dto/update.group.dto';
import { CreateObjectGroupDto } from '../dto/create.object.group.dto';
import { CreateTeacherGroupDto } from '../dto/create.teacher.group.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateStudentGroupDto } from '../dto/create.student.group.dto';

@ApiTags('group')
@ApiBearerAuth()
@Controller('group')
export class GroupController {

    constructor(private readonly groupService: GroupService) {}

    @Roles(USER_ROLE.DIRECTOR)
    @Get()
    async findAll(@Res() response: Response) {

        const res = await this.groupService.findAll();
        response.status(res.status).json(res);
    
    }

    @Roles(USER_ROLE.DIRECTOR)
    @Post()
    async create(@Body() dto: CreateGroupDto, @Res() response: Response) {

        const res = await this.groupService.create(dto);
        response.status(res.status).json(res);
    
    }

    @Roles(USER_ROLE.DIRECTOR)
    @Post('add/object/:groupId')
    async createGroupObject(@Param('groupId', ParseIntPipe) id: number, @Body() dto: CreateObjectGroupDto, @Res() response: Response) {

        const res = await this.groupService.createGroupObject(id, dto);
        response.status(res.status).json(res);
    
    }

    @Roles(USER_ROLE.DIRECTOR)
    @Post('add/teacher/:groupId')
    async createGroupTeacher(@Param('groupId', ParseIntPipe) id: number, @Body() dto: CreateTeacherGroupDto, @Res() response: Response) {

        const res = await this.groupService.createGroupTeacher(id, dto);
        response.status(res.status).json(res);
    
    }

    @Roles(USER_ROLE.DIRECTOR)
    @Post('add/student/:groupId')
    async createGroupStudent(@Param('groupId', ParseIntPipe) id: number, @Body() dto: CreateStudentGroupDto, @Res() response: Response) {

        const res = await this.groupService.createGroupStudent(id, dto);
        response.status(res.status).json(res);
    
    }

    @Roles(USER_ROLE.DIRECTOR)
    @Patch(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateGroupDto, @Res() response: Response) {

        const res = await this.groupService.update(id, dto);
        response.status(res.status).json(res);
    
    }

    @Roles(USER_ROLE.DIRECTOR)
    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number, @Res() response: Response) {

        const res = await this.groupService.remove(id);
        response.status(res.status).json(res);
    
    }

}