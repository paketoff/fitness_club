import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { UserEntity } from './modules/user/entities/user.entity';
import { UserRoleEntity } from './modules/user/entities/user-role.entity';
import { UserStatusEntity } from './modules/user/entities/user-status.entity';
import { UserGenderEntity } from './modules/user/entities/user-gender.entity';
import { CoachEntity } from './modules/coach/entities/coach.entity';
import { CoachGenderEntity } from './modules/coach/entities/coach-gender.entity';
import { CoachCategoryEntity } from './modules/coach/entities/coach-category.entity';
import { WorkoutEntity } from './modules/workout/entities/workout.entity';
import { WorkoutModule } from './modules/workout/workout.module';
import { CoachModule } from './modules/coach/coach.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { WorkoutTypeEntity } from './modules/workout/entities/workout-type.entity';
import { WorkoutHistoryEntity } from './modules/workout-history/entities/workout-history.entity';
import { CoachScheduleEntity } from './modules/coach-schedule/entities/coach-schedule.entity';
import { SubscriptionEntity } from './modules/subscription/entities/subscription.entity';
import { SubscriptionTypeEntity } from './modules/subscription/entities/subscription-type.entity';
import { SubscriptionStatusEntity } from './modules/subscription/entities/subscription-status.entity';
import { RolesGuard } from './modules/auth/guards/roles.guard';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: 'fitness_center_innodb',
        synchronize: false,
        entities: [
          UserEntity,
          UserRoleEntity,
          UserStatusEntity,
          UserGenderEntity,
          CoachEntity,
          CoachGenderEntity,
          CoachCategoryEntity,
          WorkoutEntity,
          WorkoutTypeEntity,
          WorkoutHistoryEntity,
          CoachEntity,
          CoachGenderEntity,
          CoachCategoryEntity,
          CoachScheduleEntity,
          SubscriptionEntity,
          SubscriptionTypeEntity,
          SubscriptionStatusEntity,

        ],
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    WorkoutModule,
    CoachModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    RolesGuard,
  ],
})
export class AppModule {}
