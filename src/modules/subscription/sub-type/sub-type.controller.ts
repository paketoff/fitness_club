import { SubscriptionTypeEntity } from '../entities/subscription-type.entity';
import { SubTypeService } from './sub-type.service';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req, UseGuards } from '@nestjs/common';

@Controller('sub-type')
export class SubTypeController {
  
  constructor(private readonly subTypeService: SubTypeService) {}

  @Get('get-all-types') 
  async getAllSubscriptions(): Promise<SubscriptionTypeEntity[]> {
    return await this.subTypeService.getAllSubscriptionTypes();
  }
}
