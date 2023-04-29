import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req, UseGuards } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { SubscriptionEntity } from './entities/subscription.entity';
import { SubscriptionDTO } from './DTO/subscription.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('subscriptions')
export class SubscriptionController {

  constructor(private readonly subService: SubscriptionService) {}

  @Get('get-all-subs') 
  async getAllSubscriptions(): Promise<SubscriptionEntity[]> {
    return await this.subService.getAllSubscriptions();
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'user')
  @Get(':id')
  async getSubscriptionById(
    @Param('id') id:number,
    @Req() req,
    ): Promise<SubscriptionEntity> {
    return await this.subService.findSubscriptionById(id, req.user);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  @Post('create-sub') 
  async createSubscription(
    @Body() createSubscriptionDTO: SubscriptionDTO,
    @Body('user_id', new ParseIntPipe()) user_id: number
    ): Promise<SubscriptionEntity> {
    const subscription = new SubscriptionEntity();
    Object.assign(subscription, createSubscriptionDTO);
    return await this.subService.createSubscription(subscription, user_id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'user')
  @Put(':id')
  async updateSubscriptionById(
    @Param('id') id: number,
    @Body() updatedData: SubscriptionDTO,
    @Req() req,
  ): Promise<SubscriptionEntity | null> {
    const subscriptionUpd = new SubscriptionEntity();
    Object.assign(subscriptionUpd, updatedData);
    return await this.subService.updateSubscriptionById(id, subscriptionUpd, req.user);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  async deleteSubscriptionById(
    @Param('id') id: number,
  ): Promise<void> {
    return await this.subService.deleteSubscriptionById(id);
  }

}
