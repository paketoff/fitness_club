import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req, UseGuards } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { SubscriptionEntity } from './entities/subscription.entity';
import { SubscriptionDTO } from './DTO/subscription.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { AuthGuard } from '../auth/guards/auth.guard';
import { SubscriptionTypeEntity } from './entities/subscription-type.entity';

@Controller('subscriptions')
export class SubscriptionController {

  constructor(private readonly subService: SubscriptionService) {}


  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'user')
  @Post('create-sub/:id') 
  async createSubscription(
    @Param('id') sub_type_id: number,
    @Req() req,
    ): Promise<SubscriptionEntity> {
    return await this.subService.createSubscription(sub_type_id, req.user);
  }

  @Get('types/:id')
  async getSubscriptionTypeById(
    @Param('id') id_sub_type: number
  ): Promise<SubscriptionTypeEntity> {
    return await this.subService.getSubscriptionTypeById(id_sub_type);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  @Get('get-all-subs') 
  async getAllSubscriptions(): Promise<SubscriptionEntity[]> {
    return await this.subService.getAllSubscriptions();
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'user')
  @Get('get-users-subscriptions')
  async getUserSubscriptions(
    @Req() req,
  ): Promise<SubscriptionEntity[]> {
    return await this.subService.getUserSubscriptions(req.user);
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
