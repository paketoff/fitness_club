import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
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
    ) {}

  async createCoach(coach: CoachEntity): Promise<CoachEntity> {
    const salt = await bcrypt.genSalt();
    coach.password = await bcrypt.hash(coach.password, salt);
    return await this.coachRepository.save(coach);
  }

  async getCurrentCoachInfo (user: any): Promise<CoachEntity | null> {
    const id_coach = user.id_coach;

    return await this.coachRepository.findOne({
      where: {id_coach},
      relations: ['category', 'gender', 'schedules', 'qualifications', 'role'],
    })
  }

  async getAllCoaches(): Promise<CoachEntity[]> {
    return await this.coachRepository.find();
  }

  async getCoachById(id: number, user?: any): Promise<CoachEntity> {
    return await this.coachRepository.findOne({
      where: { id_coach: id },
      relations: ['role'],
    });
  }

  async findCoachByEmail(email: string): Promise<CoachEntity | undefined> {
    return await this.coachRepository.findOne(
      {
        where: {email: email},
        relations: ['role', 'category', 'gender'],
      }
    )
  }

  async updateCurrentCoach(updatedData: any,
    user: any): Promise<CoachEntity> {
      let coach = await this.coachRepository.findOne({
        where: {
          id_coach: user.id_coach,
        },
        relations: ['category', 'gender', 'schedules', 'qualifications', 'role'],
      });
    
      if (!coach) {
        throw new NotFoundException(`Coach with id ${user.id_coach} was not found`);
      }
    
      if (coach.id_coach !== user.id_coach) {
        throw new HttpException('Coach ID mismatch', HttpStatus.FORBIDDEN);
      }
    
      if (updatedData.password) {
        const salt = await bcrypt.genSalt(12);
        coach.password = await bcrypt.hash(updatedData.password, salt);
      }
  
      coach = this.coachRepository.merge(coach, updatedData);
    
      return await this.coachRepository.save(coach);
    }

  async updateCoachById(id: number, updatedData: CoachEntity, user?: any,): Promise<CoachEntity | null> {
    if ((Number(user.id_coach) !== Number(id)) ||
      !(await this.getCoachById(id, user))
    ) {
      throw new HttpException('Forbidden resource', HttpStatus.FORBIDDEN);
    }
  
    const coach = await this.coachRepository.findOne({
      where: {
        id_coach: id,
      }
    });

    

    if (updatedData.password) {
      const salt = await bcrypt.genSalt(12);
      coach.password = await bcrypt.hash(updatedData.password, salt);
    }
    
    Object.assign(coach, updatedData);
    return await this.coachRepository.save(coach);
  }

  async deleteCoachById(id: number, user?: any): Promise<void> {
    if ((user.role_name !== 'admin')) {
      throw new HttpException('Forbidden resource', HttpStatus.FORBIDDEN);
    }

    const result = await this.coachRepository.delete(id);

    if(result.affected === 0) {
      throw new NotFoundException(`Coach with id ${id} not found`);
    }
  }

  async addQualificationToCoach(coachId: number, qualificationId: number, user?:any): Promise<CoachEntity> {
    if ((user.role_name !== 'admin')) {
      throw new HttpException('Forbidden resource', HttpStatus.FORBIDDEN);
    }

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
  
  async getQualificationsForCoach(coachId: number, user?: any): Promise<CoachQualificationEntity[]> {
    if ((user.role_name !== 'admin' && Number(user.id_coach) !== Number(coachId)) ||
      !(await this.getCoachById(coachId, user))
    ) {
      throw new HttpException('Forbidden resource', HttpStatus.FORBIDDEN);
    }

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
    user?: any,
  ): Promise<CoachEntity> {
    if ((user.role_name !== 'admin')) {
      throw new HttpException('Forbidden resource', HttpStatus.FORBIDDEN);
    }

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
    user?: any,
  ): Promise<CoachEntity> {
    if ((user.role_name !== 'admin')) {
      throw new HttpException('Forbidden resource', HttpStatus.FORBIDDEN);
    }

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

}


