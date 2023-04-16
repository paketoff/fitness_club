import { Module } from '@nestjs/common';
import { CoachQualificationService } from './coach-qualification.service';
import { CoachQualificationController } from './coach-qualification.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoachQualificationEntity } from './entities/coach-qualification.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CoachQualificationEntity]),
  ],
  providers: [CoachQualificationService],
  controllers: [CoachQualificationController]
})
export class CoachQualificationModule {}
