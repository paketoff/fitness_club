import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubscriptionTypeEntity } from '../entities/subscription-type.entity';
import { SubscriptionEntity } from '../entities/subscription.entity';

@Injectable()
export class SubTypeService {

  constructor(
    @InjectRepository(SubscriptionTypeEntity)
    private readonly subTypeRepository: Repository<SubscriptionTypeEntity>,
  ) {}

  async getAllSubscriptionTypes(): Promise<SubscriptionTypeEntity[]> {
    return this.subTypeRepository.find();
  }
}
