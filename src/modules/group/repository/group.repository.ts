import { In, Repository } from 'typeorm';
import { CustomRepository } from '@dec/typeorm-ex.decorator';
import { DbExceptions } from '@utils/exceptions/dbException';
import { GroupEntity } from '../entities/group.entity';
import { CreateGroupDto } from '../dto/create.group.dto';
import { UpdateGroupDto } from '../dto/update.group.dto';
import { CreateObjectGroupDto } from '../dto/create.object.group.dto';
import { ObjectEntity } from 'src/modules/object/entities/object.entity';
import { CreateTeacherGroupDto } from '../dto/create.teacher.group.dto';
import { CreateStudentGroupDto } from '../dto/create.student.group.dto';
import { StudentEntity } from 'src/modules/student/entities/student.entity';

@CustomRepository(GroupEntity)
export class GroupRepository extends Repository<GroupEntity> {

    async findAll(): Promise<GroupEntity[]> {

        try {

            const data = await this.find();

            return data;
        
        } catch (err) {

            DbExceptions.handle(err);
        
        }
    
    }

    async getGroupByName(groupName: string): Promise<GroupEntity> {

        try {

            return await this.findOne({ where: { group_name: groupName } });
        
        } catch (err) {

            DbExceptions.handle(err);
        
        }
    
    }

    async createGroup( dto: CreateGroupDto ): Promise<GroupEntity> {

        try {

            const group = GroupEntity.create({ group_name: dto.groupName });
            await GroupEntity.save(group);
            return group;
        
        } catch (err) {

            DbExceptions.handle(err);
        
        }
    
    }

    async createGroupObject( id: number, dto: CreateObjectGroupDto ): Promise<GroupEntity> {

        try {

            const objects = await ObjectEntity.findBy({ id: In(dto.objectId) });
            const group = await this.getGroupById(id);
            
            group.objects = objects;
            
            await this.manager.save(group);
            return group;
        
        } catch (err) {

            DbExceptions.handle(err);
        
        }
    
    }

    async getGroupById(id: number): Promise<GroupEntity> {

        try {

            return await this.findOneBy({ id });
        
        } catch (err) {

            DbExceptions.handle(err);
        
        }
    
    }

    async updateGroup( id: number, dto: UpdateGroupDto ): Promise<GroupEntity> {

        try {

            const {
                raw: [group]
            } = await GroupEntity.createQueryBuilder()
                .update(GroupEntity, { group_name: dto.groupName })
                .where('id = :id', { id })
                .returning('*')
                .updateEntity(true)
                .execute();

            return group;
            
        } catch (err) {

            DbExceptions.handle(err);
        
        }
    
    }

    async deleteGroup( id: number ): Promise<GroupEntity> {

        try {

            const {
                raw: [group]
            } = await GroupEntity.createQueryBuilder()
                .softDelete()
                .where('id = :id', { id })
                .returning('*')
                .execute();

            return group;
            
        } catch (err) {

            DbExceptions.handle(err);
        
        }
    
    }

    async createGroupTeacher( id: number, dto: CreateTeacherGroupDto ): Promise<GroupEntity> {

        try {

            const {
                raw: [group]
            } = await GroupEntity.createQueryBuilder()
                .update(GroupEntity)
                .set({ user: { id: dto.teacherId } })
                .where('id = :id', { id })
                .returning('*')
                .updateEntity(true) 
                .execute();

            return group;
        
        } catch (err) {

            DbExceptions.handle(err);
        
        }
    
    }

    async findAllByTeacher(teacherId: number): Promise<GroupEntity[]> {

        try {
            
            const data = await this.find({ where:  { user: { id: teacherId } } });
            
            return data;
        
        } catch (err) {

            DbExceptions.handle(err);
        
        }
    
    }

    async createGroupStudent( id: number, dto: CreateStudentGroupDto ): Promise<GroupEntity> {

        try {

            const {
                raw: [student]
            } = await StudentEntity.createQueryBuilder()
                .update(StudentEntity)
                .set({ group: { id } })
                .where('user.id = :id', { id: dto.studentId })
                .returning('*')
                .updateEntity(true) 
                .execute();

            return student;
        
        } catch (err) {

            DbExceptions.handle(err);
        
        }
    
    }

}
