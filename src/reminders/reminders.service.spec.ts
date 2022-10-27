import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TokensService } from '../tokens/tokens.service';
import { Reminder } from './entities/reminder.entity';
import { RemindersService } from './reminders.service';

describe('RemindersService', () => {
  let service: RemindersService;

  const mockRemindersRepository = {};
  const mockTokensService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RemindersService,
        TokensService,
        { provide: getRepositoryToken(Reminder), useValue: mockRemindersRepository },
      ],
    })
      .overrideProvider(TokensService)
      .useValue(mockTokensService)
      .compile();

    service = module.get<RemindersService>(RemindersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
