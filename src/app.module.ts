import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { UserEntity } from './modules/user/entities/user.entity';
import { UserRoleEntity } from './modules/user/entities/user-role.entity';
import { UserStatusEntity } from './modules/user/entities/user-status.entity';
import { UserGenderEntity } from './modules/user/entities/user-gender.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'bingerlewe',
      database: 'fitness_center_innodb',
      synchronize: false,
      entities: [
        UserEntity,
        UserRoleEntity,
        UserStatusEntity,
        UserGenderEntity
      ]
    }),
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
