import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req, Res } from '@nestjs/common';
import { Response } from 'express';
import { StudentService } from '../service/student.service';
import { Roles } from '@dec/roles.decorator';
import { USER_ROLE } from '@utils/enums';
import { CreateStudentDto } from '../dto/create.student.dto';
import { UpdateStudentDto } from '../dto/update.student.dto';
import { ApiTags } from '@nestjs/swagger';
import { iReq } from '@utils/interface';

@ApiTags('student')
@Controller('student')
export class StudentController {

    constructor(private readonly studentService: StudentService) {}

    @Roles(USER_ROLE.DIRECTOR)
    @Get()
    async findAll(@Res() response: Response) {

        const res = await this.studentService.findAll();
        response.status(res.status).json(res);
    
    }

    @Roles(USER_ROLE.STUDENT)
    @Get('my/grades')
    async findGrades(@Req() req: iReq & { user: any }, @Res() response: Response) {

        const res = await this.studentService.findGrades(req.user);
        response.status(res.status).json(res);
    
    }

    @Roles(USER_ROLE.DIRECTOR)
    @Post()
    async create(@Body() dto: CreateStudentDto, @Res() response: Response) {

        const res = await this.studentService.create(dto);
        response.status(res.status).json(res);
    
    }

    @Roles(USER_ROLE.DIRECTOR)
    @Patch(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateStudentDto, @Res() response: Response) {

        const res = await this.studentService.update(id, dto);
        response.status(res.status).json(res);
    
    }

    @Roles(USER_ROLE.DIRECTOR)
    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number, @Res() response: Response) {

        const res = await this.studentService.remove(id);
        response.status(res.status).json(res);
    
    }

}