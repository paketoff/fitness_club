import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubscriptionEntity } from './entities/subscription.entity';
import { Repository } from 'typeorm';
import { SubscriptionTypeEntity } from './entities/subscription-type.entity';
import { SubscriptionStatusEntity } from './entities/subscription-status.entity';
import { UserEntity } from '../user/entities/user.entity';

@Injectable()
export class SubscriptionService {

  constructor(
    @InjectRepository(SubscriptionEntity)
    private readonly subRepository: Repository<SubscriptionEntity>,
    @InjectRepository(SubscriptionTypeEntity)
    private readonly subTypeRepository: Repository<SubscriptionTypeEntity>,
    @InjectRepository(SubscriptionStatusEntity)
    private readonly subStatusRepository: Repository<SubscriptionStatusEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getSubscriptionTypeById(sub_type_id: number): Promise<SubscriptionTypeEntity> {
    return await this.subTypeRepository.findOne({
      where: {id_subscription_type: sub_type_id},
    });
  }

  async createSubscription(sub_type_id: number, user: any): Promise<SubscriptionEntity> {

    const currentDate = new Date(); // текущая дата
    const startDate = new Date(currentDate.getTime() + (1000 * 60 * 60 * 24)); // текущая дата + 1 день
    const endDate = new Date(startDate.getTime() + (1000 * 60 * 60 * 24 * 30)); // startDate + 30 дней

    if(sub_type_id == 3) {
      let subscription = new SubscriptionEntity();

      subscription.price = 400;
      subscription.start_period = startDate;
      subscription.end_period = endDate;
      subscription.trains_count = 12;
      subscription.user = await this.userRepository.findOne({
        where: {
          id_user: user.id_user,
        }
      });
      subscription.subscriptionStatus = await this.subStatusRepository.findOne({
        where: {id_status: 2},
      }), 
      subscription.subscriptionType = await this.subTypeRepository.findOne({
        where: {id_subscription_type: 3},
      });

      return await this.subRepository.save(subscription);
    }
    
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

  async getUserSubscriptions(user: any): Promise<SubscriptionEntity[]> {
    if (!user) {
      throw new HttpException('User object not provided', HttpStatus.BAD_REQUEST);
    }

    const reqUser = await this.userRepository.findOne({
      where: {
        id_user: user.id_user,
      }
    });

    if (!reqUser) {
      throw new HttpException('Requested user not found', HttpStatus.NOT_FOUND);
    }

    const subscriptions = await this.subRepository.find({
      where: {user: reqUser},
      relations: ['subscriptionStatus'],
    })

    if (user.role_name !== 'admin' && user.id_user !== reqUser.id_user) {
      throw new HttpException('Forbidden resource', HttpStatus.FORBIDDEN);
    }

    if(user.role_name == 'coach') {
      throw new HttpException('Forbidden resource', HttpStatus.FORBIDDEN);
    }

    return subscriptions;
  }

  async updateSubscriptionById(id: number, updatedData: SubscriptionEntity, user?: any): Promise<SubscriptionEntity | null> {

    const subscription = await this.findSubscriptionById(id);

    if(user.role_name !== 'admin') {
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
