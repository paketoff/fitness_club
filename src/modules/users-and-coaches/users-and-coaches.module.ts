import { Module } from '@nestjs/common';
import { UsersAndCoachesService } from './users-and-coaches.service';
import { UsersAndCoachesController } from './users-and-coaches.controller';

@Module({
  providers: [UsersAndCoachesService],
  controllers: [UsersAndCoachesController]
})
export class UsersAndCoachesModule {}
