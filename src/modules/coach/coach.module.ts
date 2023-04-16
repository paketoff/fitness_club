import { Module } from '@nestjs/common';
import { CoachService } from './coach.service';
import { CoachController } from './coach.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoachEntity } from './entities/coach.entity';
import { CoachQualificationEntity } from '../coach-qualification/entities/coach-qualification.entity';
import { CoachQualificationService } from '../coach-qualification/coach-qualification.service';
import { CoachQualificationController } from '../coach-qualification/coach-qualification.controller';
import { CoachQualificationModule } from '../coach-qualification/coach-qualification.module';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { UserController } from '../user/user.controller';
import { UserEntity } from '../user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CoachEntity, 
      CoachQualificationEntity,
      UserEntity,
    ]),
    CoachQualificationModule,
    UserModule,
  ],
  providers: [CoachService, CoachQualificationService, UserService],
  controllers: [CoachController, CoachQualificationController, UserController],
  exports: [CoachService]
})
export class CoachModule {}
