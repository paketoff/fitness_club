import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CoachEntity } from './entities/coach.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { CoachQualificationEntity } from '../coach-qualification/entities/coach-qualification.entity';
import { UserEntity } from '../user/entities/user.entity';
import { RoleService } from '../user/role.service';


@Injectable()
export class CoachService {
  constructor(
    @InjectRepository(CoachEntity)
    private readonly coachRepository: Repository<CoachEntity>,
    @InjectRepository(CoachQualificationEntity)
    private readonly qualificationRepository: Repository<CoachQualificationEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly roleService: RoleService,
    ) {}

  async createCoach(coach: CoachEntity): Promise<CoachEntity> {
    const salt = await bcrypt.genSalt();
    coach.password = await bcrypt.hash(coach.password, salt);
    return await this.coachRepository.save(coach);
  }

  async getAllCoaches(): Promise<CoachEntity[]> {
    return await this.coachRepository.find();
  }

  async getCoachById(id: number, user?: any): Promise<CoachEntity> {
    if (user) {
      const userRole = await this.roleService.getRoleById(user.role_id);
  
      if (userRole.role_name === 'coach' && user.id_coach === id) {
        throw new UnauthorizedException();
      }
    }
  
    return await this.coachRepository.findOne({
      where: { id_coach: id },
      relations: ['role_id'],
    });
  }

  async findCoachByEmail(email: string): Promise<CoachEntity | undefined> {
    return await this.coachRepository.findOne(
      {
        where: {email: email},
        relations: ['role_id', 'category', 'gender'],
      }
    )
  }

  async updateCoachById(id: number, updatedData: CoachEntity): Promise<CoachEntity | null> {
    const coach = await this.coachRepository.preload({
      id_coach: id,
      ...updatedData
    });

    if(!coach) {
      throw new NotFoundException(`Coach with id ${id} was not found!`);
    }

    return await this.coachRepository.save(coach);
  }

  async deleteCoachById(id: number): Promise<void> {
    const result = await this.coachRepository.delete(id);

    if(result.affected === 0) {
      throw new NotFoundException(`Coach with id ${id} not found`);
    }
  }

  async addQualificationToCoach(coachId: number, qualificationId: number): Promise<CoachEntity> {
    const coach = await this.coachRepository.findOne({
      where: {
        id_coach: coachId,
      },
      relations: ['qualifications']
    });
  
    const qualification = await this.qualificationRepository.findOne({
      where: {
        id_qualification: qualificationId,
      }
    });
  
    if (!coach || !qualification) {
      throw new NotFoundException('Coach or qualification not found');
    }
  
    coach.qualifications.push(qualification);
    await this.coachRepository.save(coach);
  
    return coach;
  }
  
  async getQualificationsForCoach(coachId: number): Promise<CoachQualificationEntity[]> {
    const coach = await this.coachRepository.findOne({
      where: {
        id_coach: coachId,
      },
      relations: ['qualifications'],
    });
  
    if (!coach) {
      throw new NotFoundException('Coach not found');
    }
  
    return coach.qualifications;
  }

  async updateQualificationsForCoach(
    coachId: number,
    newQualificationIds: number[],
  ): Promise<CoachEntity> {
    const coach = await this.coachRepository.findOne({
      where: {
        id_coach: coachId,
      },
      relations: ['qualifications'],
    });
  
    if (!coach) {
      throw new NotFoundException('Coach not found');
    }
  
    const newQualifications = await this.qualificationRepository.findByIds(newQualificationIds);
  
    coach.qualifications = newQualifications;
    await this.coachRepository.save(coach);
  
    return coach;
  }

  
  async removeQualificationFromCoach(
    coachId: number,
    qualificationId: number,
  ): Promise<CoachEntity> {
    const coach = await this.coachRepository.findOne({
      where: {
        id_coach: coachId,
      },
      relations: ['qualifications'],
    });
  
    if (!coach) {
      throw new NotFoundException('Coach not found');
    }
  
    const qualificationIndex = coach.qualifications.findIndex(
      (qualification) => qualification.id_qualification === qualificationId,
    );
  
    if (qualificationIndex === -1) {
      throw new NotFoundException('Qualification not found in coach qualifications');
    }
  
    coach.qualifications.splice(qualificationIndex, 1);
    await this.coachRepository.save(coach);
  
    return coach;
  }
  
  private async findCoachAndUserWithRelations(coachId: number, userId: number) {
    const coach = await this.coachRepository.findOne({
      where: { id_coach: coachId },
      relations: ['clients'],
    });
  
    if (!coach) {
      throw new NotFoundException('Coach not found');
    }
  
    const user = await this.userRepository.findOne({
      where: { id_user: userId },
      relations: ['coaches'],
    });
  
    if (!user) {
      throw new NotFoundException('User not found');
    }
  
    return { coach, user };
  }

  async addUserToCoach(coachId: number, userId: number): Promise<CoachEntity> {
    const { coach, user } = await this.findCoachAndUserWithRelations(coachId, userId);
  
    if (coach.clients.some((client) => client.id_user === userId)) {
      throw new BadRequestException('User is already assigned to this coach');
    }
  
    coach.clients.push(user);
    await this.coachRepository.save(coach);
  
    return coach;
  }

  
  async getUsersForCoach(coachId: number): Promise<UserEntity[]> {
    const coach = await this.coachRepository.findOne({
      where: { id_coach: coachId },
      relations: ['clients'],
    });
  
    if (!coach) {
      throw new NotFoundException('Coach not found');
    }
  
    return coach.clients;
  }

  
  async updateUsersForCoach(
    coachId: number,
    newUserIds: number[],
  ): Promise<CoachEntity> {
    const coach = await this.coachRepository.findOne({
      where: { id_coach: coachId },
      relations: ['clients'],
    });
  
    if (!coach) {
      throw new NotFoundException('Coach not found');
    }
  
    const newUsers = await this.userRepository.findByIds(newUserIds);
  
    coach.clients = newUsers;
    await this.coachRepository.save(coach);
  
    return coach;
  }
  
  async removeUserFromCoach(
    coachId: number,
    userId: number,
  ): Promise<CoachEntity> {
    const { coach, user } = await this.findCoachAndUserWithRelations(coachId, userId);
  
    const userIndex = coach.clients.findIndex(
      (client) => client.id_user === userId,
    );
  
    if (userIndex === -1) {
      throw new NotFoundException('User not found in coach clients');
    }
  
    coach.clients.splice(userIndex, 1);
    await this.coachRepository.save(coach);
  
    return coach;
  }
  
}


