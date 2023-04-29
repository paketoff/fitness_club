import { Module } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { SubscriptionController } from './subscription.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriptionEntity } from './entities/subscription.entity';
import { UserModule } from '../user/user.module';
import { RolesGuard } from '../auth/guards/roles.guard';
import { RoleEntity } from '../user/entities/role.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SubscriptionEntity, RoleEntity]),
    UserModule,
],
  providers: [SubscriptionService, RolesGuard],
  controllers: [SubscriptionController]
})
export class SubscriptionModule {}
