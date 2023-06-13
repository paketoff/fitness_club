import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { UserEntity } from './modules/user/entities/user.entity';
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
import { CoachQualificationEntity } from './modules/coach-qualification/entities/coach-qualification.entity';
import { SubscriptionModule } from './modules/subscription/subscription.module';
import { RoleEntity } from './modules/user/entities/role.entity';
import { WorkoutHistoryModule } from './modules/workout-history/workout-history.module';
import { CoachScheduleModule } from './modules/coach-schedule/coach-schedule.module';
import { AnswersModule } from './modules/answers/answers.module';
import { QuestionsModule } from './modules/questions/questions.module';
import { ProductionModule } from './modules/production/production.module';
import { SurveyModule } from './modules/survey/survey.module';
import { AnswerEntity } from './modules/answers/entities/answer.entity';
import { QuestionEntity } from './modules/questions/entities/question.entity';
import { ProductionEntity } from './modules/production/entities/production.entity';
import { SurveyService } from './modules/survey/survey.service';
import { SubTypeModule } from './modules/subscription/sub-type/sub-type.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([RoleEntity]),
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
          RoleEntity,
          UserStatusEntity,
          UserGenderEntity,
          CoachEntity,
          CoachGenderEntity,
          CoachCategoryEntity,
          WorkoutEntity,
          WorkoutTypeEntity,
          WorkoutHistoryEntity,
          CoachScheduleEntity,
          SubscriptionEntity,
          SubscriptionTypeEntity,
          SubscriptionStatusEntity,
          CoachQualificationEntity,
          QuestionEntity,
          AnswerEntity,
          ProductionEntity,
        ],
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    WorkoutModule,
    CoachModule,
    SubscriptionModule,
    WorkoutHistoryModule,
    CoachScheduleModule,
    AnswersModule,
    QuestionsModule,
    ProductionModule,
    SurveyModule,
    SubTypeModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    RolesGuard,
  ],
  exports: [RolesGuard],
})
export class AppModule {}
