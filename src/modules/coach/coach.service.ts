import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CoachEntity } from './entities/coach.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { CoachQualificationEntity } from '../coach-qualification/entities/coach-qualification.entity';


@Injectable()
export class CoachService {
  constructor(
    @InjectRepository(CoachEntity)
    private readonly coachRepository: Repository<CoachEntity>,
    @InjectRepository(CoachQualificationEntity)
    private readonly qualificationRepository: Repository<CoachQualificationEntity>,
    ) {}

  async createCoach(coach: CoachEntity): Promise<CoachEntity> {
    const salt = await bcrypt.genSalt();
    coach.password = await bcrypt.hash(coach.password, salt);
    return await this.coachRepository.save(coach);
  }

  async getAllCoaches(): Promise<CoachEntity[]> {
    return await this.coachRepository.find();
  }

  async getCoachById(id: number): Promise<CoachEntity> {
    return await this.coachRepository.findOne({
      where: {id_coach: id}
    });
  }

  async findCoachByEmail(email: string): Promise<CoachEntity | undefined> {
    return await this.coachRepository.findOne(
      {
        where: {email: email}
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
  
}


