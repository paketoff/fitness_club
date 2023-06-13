import { Test } from '@nestjs/testing';
import { SurveyController } from './survey.controller';
import { SurveyService } from './survey.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AnswerEntity } from '../answers/entities/answer.entity';
import { ProductionEntity } from '../production/entities/production.entity';
import { QuestionEntity } from '../questions/entities/question.entity';
import { SubscriptionTypeEntity } from '../subscription/entities/subscription-type.entity';

describe('SurveyController', () => {
    let surveyController: SurveyController;
    let surveyService: SurveyService;
  
    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [SurveyController],
            providers: [SurveyService,
                { provide: getRepositoryToken(AnswerEntity), useClass: Repository },
                { provide: getRepositoryToken(QuestionEntity), useClass: Repository },
                { provide: getRepositoryToken(ProductionEntity), useClass: Repository },
                {provide: getRepositoryToken(SubscriptionTypeEntity), useClass: Repository}],
        }).compile();
  
        surveyService = moduleRef.get<SurveyService>(SurveyService);
        surveyController = moduleRef.get<SurveyController>(SurveyController);
    });

    describe('processAnswer', () => {
        it('TRUE', async () => {
            const id = 4;
            const answerEntity: AnswerEntity = new AnswerEntity();
            answerEntity.id_answer = id;

            const expectedResult = [{ answer_text: 'Expected Answer', id_answer: id }];
            jest.spyOn(surveyService, 'findProductionAndExecute').mockImplementation(async () => expectedResult);

            const result = await surveyController.processAnswer(id);
            expect(result).toBe(expectedResult);
        });
    });
});
