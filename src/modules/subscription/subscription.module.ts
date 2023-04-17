import { Module } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { SubscriptionController } from './subscription.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriptionEntity } from './entities/subscription.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([SubscriptionEntity]),
    UserModule,
],
  providers: [SubscriptionService],
  controllers: [SubscriptionController]
})
export class SubscriptionModule {}
