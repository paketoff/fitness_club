import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { RoleService } from './role.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  
  async createUser(user: UserEntity): Promise<UserEntity> {
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);
    return await this.userRepository.save(user);
  }

  async getAllUsers(paginationOptions: { page: number, limit: number }): Promise<
  { data: UserEntity[], 
    total: number, 
    page: number, 
    limit: number }> {
    const [results, total] = await this.userRepository.findAndCount({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return {
      data: results,
      total,
      page: paginationOptions.page,
      limit: paginationOptions.limit
    };
  }


  async findUserByEmail(email: string): Promise<UserEntity | undefined> {
    return await this.userRepository.findOne({
      where: { email },
      relations: ['user_role'] 
    });
  }

  async findUserById(id: number, user?: any): Promise<UserEntity | undefined> {
    return await this.userRepository.findOne({
      where: {id_user: id},
      relations: ['user_role'],
    });
  }

  async getCurrentUserInfo (user_jwt: any): Promise<UserEntity> {

    const id_user = user_jwt.id_user;

    return await this.userRepository.findOne({
      where: { id_user },
      relations: ['user_role'] 
    });
  }

  async updateCurrentUser(updatedData: Partial<UserEntity>, user_jwt: any): Promise<UserEntity> {
  
    let user = await this.userRepository.findOne({
      where: {
        id_user: user_jwt.id_user,
      },
    });
  
    if (!user) {
      throw new NotFoundException(`User with id ${user_jwt.id_user} not found`);
    }
  
    if (user.id_user !== user_jwt.id_user) {
      throw new HttpException('User ID mismatch', HttpStatus.FORBIDDEN);
    }
  
    if (updatedData.password) {
      const salt = await bcrypt.genSalt(12);
      user.password = await bcrypt.hash(updatedData.password, salt);
    }

    user = this.userRepository.merge(user, updatedData);
  
    return await this.userRepository.save(user);
  }

  async updateUserById(id: number, updatedData: Partial<UserEntity>, user_jwt?: any): Promise<UserEntity> {

    if((user_jwt.role_name !== 'admin' && Number(user_jwt.id_user) !== Number(id)) || !(await this.findUserById(id, user_jwt))
      ) {
        throw new HttpException('Forbidden resource', HttpStatus.FORBIDDEN);
      }


    const user = await this.userRepository.findOne({
      where: {
        id_user: id,
      }
    })

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    if (updatedData.password) {
      const salt = await bcrypt.genSalt(12);
      user.password = await bcrypt.hash(updatedData.password, salt);
    }

    return await this.userRepository.save(user);
  }



  async deleteUserById(id: number): Promise<void> {
    const result = await this.userRepository.delete(id);

    if(result.affected === 0) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
  }
}
