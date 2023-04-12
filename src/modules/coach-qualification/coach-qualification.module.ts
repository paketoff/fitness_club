import { Module } from '@nestjs/common';
import { CoachQualificationService } from './coach-qualification.service';
import { CoachQualificationController } from './coach-qualification.controller';

@Module({
  providers: [CoachQualificationService],
  controllers: [CoachQualificationController]
})
export class CoachQualificationModule {}
