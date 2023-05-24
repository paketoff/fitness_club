import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionsModule } from '../questions/questions.module';
import { AnswersModule } from '../answers/answers.module';
import { ProductionModule } from '../production/production.module';
import { SurveyService } from './survey.service';
import { SurveyController } from './survey.controller';
import { SubscriptionTypeEntity } from '../subscription/entities/subscription-type.entity';
import { QuestionEntity } from '../questions/entities/question.entity';
import { AnswerEntity } from '../answers/entities/answer.entity';
import { ProductionEntity } from '../production/entities/production.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([QuestionEntity, AnswerEntity, ProductionEntity, SubscriptionTypeEntity])
  ],
  providers: [SurveyService],
  controllers: [SurveyController],
})
export class SurveyModule {}
