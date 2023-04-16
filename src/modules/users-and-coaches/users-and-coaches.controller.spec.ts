import { Test, TestingModule } from '@nestjs/testing';
import { UsersAndCoachesController } from './users-and-coaches.controller';

describe('UsersAndCoachesController', () => {
  let controller: UsersAndCoachesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersAndCoachesController],
    }).compile();

    controller = module.get<UsersAndCoachesController>(UsersAndCoachesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
