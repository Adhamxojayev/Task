import { Repository } from 'typeorm';
import { CustomRepository } from '@dec/typeorm-ex.decorator';
import { DbExceptions } from '@utils/exceptions/dbException';
import { ObjectEntity } from '../entities/object.entity';
import { CreateObjectDto } from '../dto/create.object.dto';
import { UpdateObjectDto } from '../dto/update.object.dto';

@CustomRepository(ObjectEntity)
export class ObjectRepository extends Repository<ObjectEntity> {

    async findAll(): Promise<ObjectEntity[]> {

        try {

            const data = await this.find();

            return data;
        
        } catch (err) {

            DbExceptions.handle(err);
        
        }
    
    }

    async getObjectByName(objectName: string): Promise<ObjectEntity> {

        try {

            return await this.findOne({ where: { objectName } });
        
        } catch (err) {

            DbExceptions.handle(err);
        
        }
    
    }

    async createObject( dto: CreateObjectDto ): Promise<any> {

        try {

            const object = ObjectEntity.create(dto);
            await ObjectEntity.save(object);
            return object;
        
        } catch (err) {

            DbExceptions.handle(err);
        
        }
    
    }

    async getObjectById(id: number): Promise<ObjectEntity> {

        try {

            return await this.findOneBy({ id });
        
        } catch (err) {

            DbExceptions.handle(err);
        
        }
    
    }

    async updateObject( id: number, dto: UpdateObjectDto ): Promise<ObjectEntity> {

        try {

            const {
                raw: [object]
            } = await ObjectEntity.createQueryBuilder()
                .update(ObjectEntity, { objectName : dto.objectName })
                .where('id = :id', { id })
                .returning('*')
                .updateEntity(true)
                .execute();

            return object;
            
        } catch (err) {

            DbExceptions.handle(err);
        
        }
    
    }

    async deleteObject( id: number ): Promise<ObjectEntity> {

        try {

            const {
                raw: [group]
            } = await ObjectEntity.createQueryBuilder()
                .softDelete()
                .where('id = :id', { id })
                .returning('*')
                .execute();

            return group;
            
        } catch (err) {

            DbExceptions.handle(err);
        
        }
    
    }

}
