import { Module } from '@nestjs/common';
import { CoachService } from './coach.service';
import { CoachController } from './coach.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoachEntity } from './entities/coach.entity';
import { CoachQualificationEntity } from '../coach-qualification/entities/coach-qualification.entity';
import { CoachQualificationService } from '../coach-qualification/coach-qualification.service';
import { CoachQualificationController } from '../coach-qualification/coach-qualification.controller';
import { CoachQualificationModule } from '../coach-qualification/coach-qualification.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CoachEntity, 
      CoachQualificationEntity,
    ]),
    CoachQualificationModule,
  ],
  providers: [CoachService, CoachQualificationService],
  controllers: [CoachController, CoachQualificationController],
  exports: [CoachService]
})
export class CoachModule {}
