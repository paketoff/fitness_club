import { Module } from '@nestjs/common';
import { SubTypeService } from './sub-type.service';
import { SubTypeController } from './sub-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriptionTypeEntity } from '../entities/subscription-type.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SubscriptionTypeEntity]),
    
  ],
  providers: [SubTypeService],
  controllers: [SubTypeController],
})
export class SubTypeModule {}
