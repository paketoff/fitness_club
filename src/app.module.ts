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
          WorkoutEntity
        ],
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    WorkoutModule,
    CoachModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
