import { Module } from '@nestjs/common';
import { CoachQualificationService } from './coach-qualification.service';
import { CoachQualificationController } from './coach-qualification.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoachQualificationEntity } from './entities/coach-qualification.entity';
import { RolesGuard } from '../auth/guards/roles.guard';
import { RoleEntity } from '../user/entities/role.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CoachQualificationEntity, RoleEntity]),
  ],
  providers: [CoachQualificationService, RolesGuard],
  controllers: [CoachQualificationController]
})
export class CoachQualificationModule {}
