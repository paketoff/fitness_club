import { Test, TestingModule } from '@nestjs/testing';
import { UsersAndCoachesService } from './users-and-coaches.service';

describe('UsersAndCoachesService', () => {
  let service: UsersAndCoachesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersAndCoachesService],
    }).compile();

    service = module.get<UsersAndCoachesService>(UsersAndCoachesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
