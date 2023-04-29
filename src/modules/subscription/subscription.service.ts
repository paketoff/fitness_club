import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubscriptionEntity } from './entities/subscription.entity';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';

@Injectable()
export class SubscriptionService {

  constructor(
    @InjectRepository(SubscriptionEntity)
    private readonly subRepository: Repository<SubscriptionEntity>,
    private readonly userService: UserService,
  ) {}

  async createSubscription(sub: SubscriptionEntity, user_id: number): Promise<SubscriptionEntity> {
    const res_user = await this.userService.findUserById(user_id);
  
    if (!res_user) {
      throw new NotFoundException(`User with id ${user_id} not found`);
    }
  
    sub.user = res_user;
  
    return await this.subRepository.save(sub);
  }
  

  async getAllSubscriptions(): Promise<SubscriptionEntity[]> {
    return await this.subRepository.find();
  }

  async findSubscriptionById(id: number, user?: any): Promise<SubscriptionEntity> {

    const subscription = await this.subRepository.findOne({
      where: {id_subscription: id},
      relations: ['user'],
    });

    if(user && user.role_name !== 'admin' && user.id_user !== subscription.user.id_user) {
      throw new HttpException('Forbidden resource', HttpStatus.FORBIDDEN);
    }

    return subscription;
  }

  async updateSubscriptionById(id: number, updatedData: SubscriptionEntity, user?: any): Promise<SubscriptionEntity | null> {

    const subscription = await this.findSubscriptionById(id);

    if(user.role_name !== 'admin' && user.id_user !== subscription.user.id_user) {
      throw new HttpException('Forbidden resource', HttpStatus.FORBIDDEN);
    }

    if(!subscription) {
      throw new NotFoundException(`Subscription with ${id} not found!`);
    }

    Object.assign(subscription, updatedData);
    return await this.subRepository.save(subscription);
  }

  async deleteSubscriptionById(id: number): Promise<void> {
    const result = await this.subRepository.delete(id);

    if(result.affected === 0) {
      throw new NotFoundException(`Subscription with id ${id} not found`);
    }
  }


}
