import { Module } from '@nestjs/common';
import { CoachService } from './coach.service';
import { CoachController } from './coach.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoachEntity } from './entities/coach.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CoachEntity])
  ],
  providers: [CoachService],
  controllers: [CoachController],
  exports: [CoachService]
})
export class CoachModule {}
