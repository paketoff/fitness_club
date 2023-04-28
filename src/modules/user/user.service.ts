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
    private readonly roleService: RoleService,
  ) {}

  
  async createUser(user: UserEntity): Promise<UserEntity> {
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);
    return await this.userRepository.save(user);
  }

  async getAllUsers(): Promise<UserEntity[]> {
    return await this.userRepository.find();
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
