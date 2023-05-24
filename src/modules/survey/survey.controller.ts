import { Body, Controller, Get, NotFoundException, Post } from '@nestjs/common';
import { SurveyService } from './survey.service';

@Controller('survey')
export class SurveyController {
  constructor(private readonly surveyService: SurveyService) {}

  @Get('questions')
  async getQuestions() {
    return this.surveyService.getQuestions();
  }

  @Post('answers')
  async processAnswer(@Body() body):Promise <any> {
    const { answerId } = body;
    const production = await this.surveyService.findProduction(answerId);
    if (!production) {
      throw new NotFoundException('Production not found');
    }
    const result = await this.surveyService.executeProduction(production);
    return result;
  }
}

