import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { SubscriptionEntity } from './entities/subscription.entity';
import { SubscriptionDTO } from './DTO/subscription.dto';

@Controller('subscriptions')
export class SubscriptionController {

  constructor(private readonly subService: SubscriptionService) {}

  @Get('get-all-subs') 
  async getAllSubscriptions(): Promise<SubscriptionEntity[]> {
    return await this.subService.getAllSubscriptions();
  }

  @Get(':id')
  async getSubscriptionById(@Param('id') id:number): Promise<SubscriptionEntity> {
    return await this.subService.findSubscriptionById(id);
  }

  @Post('create-sub') 
  async createSubscription(
    @Body() createSubscriptionDTO: SubscriptionDTO,
    @Body('user_id', ParseIntPipe) user_id: number
    ): Promise<SubscriptionEntity> {
    const subscription = new SubscriptionEntity();
    Object.assign(subscription, createSubscriptionDTO);
    return await this.subService.createSubscription(subscription, user_id);
  }

  @Put(':id')
  async updateSubscriptionById(
    @Param('id') id: number,
    @Body() updatedData: SubscriptionDTO,
  ): Promise<SubscriptionEntity | null> {
    const subscriptionUpd = new SubscriptionEntity();
    Object.assign(subscriptionUpd, updatedData);
    return await this.subService.updateSubscriptionById(id, subscriptionUpd);
  }

  @Delete(':id')
  async deleteSubscriptionById(
    @Param('id') id: number,
  ): Promise<void> {
    return await this.subService.deleteSubscriptionById(id);
  }

}
