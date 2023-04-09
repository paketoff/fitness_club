import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubscriptionEntity } from './entities/subscription.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SubscriptionService {

  constructor(
    @InjectRepository(SubscriptionEntity)
    private readonly subRepository: Repository<SubscriptionEntity>
  ) {}

  async createSubscription(sub: SubscriptionEntity): Promise<SubscriptionEntity> {
    return await this.subRepository.save(sub);
  }

  async getAllSubscriptions(): Promise<SubscriptionEntity[]> {
    return await this.subRepository.find();
  }

  async findSubscriptionById(id: number): Promise<SubscriptionEntity> {
    return await this.subRepository.findOne({
      where: {id_subscription: id}
    });
  }

  async updateSubscriptionById(id: number, updatedData): Promise<SubscriptionEntity | null> {
    const sub = await this.subRepository.preload({
      id_subscription: id, 
      ...updatedData,
    });

    if(!sub) {
      throw new NotFoundException(`Subscription with ${id} not found!`);
    }

    return await this.subRepository.save(sub);
  }

  async deleteSubscriptionById(id: number): Promise<void> {
    const result = await this.subRepository.delete(id);

    if(result.affected === 0) {
      throw new NotFoundException(`Subscription with id ${id} not found`);
    }
  }


}
