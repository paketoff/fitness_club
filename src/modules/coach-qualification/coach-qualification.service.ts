import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CoachQualificationEntity } from './entities/coach-qualification.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CoachQualificationService {
  constructor(
    @InjectRepository(CoachQualificationEntity)
    private readonly qualificationRepository: Repository<CoachQualificationEntity>,
  ) {}

  async createQualification(qualification: CoachQualificationEntity): Promise<CoachQualificationEntity> {
    return await this.qualificationRepository.save(qualification);
  }

  async getAllQualifications(): Promise<CoachQualificationEntity[]> {
    return await this.qualificationRepository.find();
  }

  async getQualificationById(id: number): Promise<CoachQualificationEntity> {
    return await this.qualificationRepository.findOne({
      where: { id_qualification: id },
    });
  }

  async updateQualificationById(id: number, updatedData: CoachQualificationEntity): Promise<CoachQualificationEntity | null> {
    const qualification = await this.qualificationRepository.preload({
      id_qualification: id,
      ...updatedData,
    });

    if (!qualification) {
      throw new NotFoundException(`Qualification with id ${id} was not found!`);
    }

    return await this.qualificationRepository.save(qualification);
  }

  async deleteQualificationById(id: number): Promise<void> {
    const result = await this.qualificationRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Qualification with id ${id} not found`);
    }
  }
}
