import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectRepository } from '../repository/object.repository';
import { ObjectEntity } from '../entities/object.entity';
import { BaseResponse } from '@utils/base.response';
import { ServiceExceptions } from '@utils/exceptions/service.expection';
import { CreateObjectDto } from '../dto/create.object.dto';
import { UpdateObjectDto } from '../dto/update.object.dto';
import { GroupRepository } from 'src/modules/group/repository/group.repository';

@Injectable()
export class ObjectService {

    constructor(
        @InjectRepository(ObjectRepository)
        private readonly objectRepository: ObjectRepository,
        @InjectRepository(GroupRepository)
        private readonly groupRepository: GroupRepository
    ) {}
    
    async findAll(): Promise<BaseResponse<ObjectEntity[]>> {

        try {

            const data = await this.objectRepository.findAll();
            return { status: HttpStatus.OK, data:  data, message: 'OK' };
        
        } catch (err) {

            ServiceExceptions.handle(err, ObjectService.name, 'findAll');
        
        }
    
    }

    async create( dto: CreateObjectDto ): Promise<BaseResponse<ObjectEntity>> {

        try {

            const object = await this.objectRepository.getObjectByName( dto.objectName );
            if (object) {

                return {
                    status: HttpStatus.BAD_REQUEST,
                    data: null,
                    message: 'This object name already exists'
                };
            
            }

            const newObject = await this.objectRepository.createObject(dto);

            return {
                status: HttpStatus.CREATED,
                message: 'created',
                data: newObject
            };
        
        } catch (err) {

            ServiceExceptions.handle(err, ObjectService.name, 'create');
        
        }
    
    }

    async update( id: number, dto: UpdateObjectDto ): Promise<BaseResponse<ObjectEntity>> {

        try {

            const object = await this.objectRepository.getObjectById(id);
            if (!object) {

                return {
                    status: HttpStatus.NOT_FOUND,
                    data: null,
                    message: 'Object not found'
                };
            
            }

            const newGroup = await this.objectRepository.updateObject(id, dto);

            return {
                status: HttpStatus.OK,
                message: 'updated',
                data: newGroup
            };
        
        } catch (err) {

            ServiceExceptions.handle(err, ObjectService.name, 'update');
        
        }
    
    }

    async remove( id: number ): Promise<BaseResponse<ObjectEntity>> {

        try {

            const group = await this.objectRepository.getObjectById(id);
            if (!group) {

                return {
                    status: HttpStatus.NOT_FOUND,
                    data: null,
                    message: 'Object not found'
                };
            
            }

            const deletedGroup = await this.objectRepository.deleteObject(id);

            return {
                status: HttpStatus.OK,
                message: 'deleted',
                data: deletedGroup
            };
        
        } catch (err) {

            ServiceExceptions.handle(err, ObjectService.name, 'remove');
        
        }
    
    }

}
