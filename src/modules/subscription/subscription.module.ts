import { Module } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { SubscriptionController } from './subscription.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriptionEntity } from './entities/subscription.entity';
import { UserModule } from '../user/user.module';
import { RolesGuard } from '../auth/guards/roles.guard';
import { RoleEntity } from '../user/entities/role.entity';
import { SubscriptionTypeEntity } from './entities/subscription-type.entity';
import { SubscriptionStatusEntity } from './entities/subscription-status.entity';
import { SubTypeModule } from './sub-type/sub-type.module';
import { UserEntity } from '../user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SubscriptionEntity, SubscriptionTypeEntity, SubscriptionStatusEntity, RoleEntity, UserEntity]),
    UserModule,
    SubTypeModule,
],
  providers: [SubscriptionService, RolesGuard],
  controllers: [SubscriptionController]
})
export class SubscriptionModule {}
