import { Test, TestingModule } from '@nestjs/testing';
import { TokensService } from '../tokens/tokens.service';
import { RemindersController } from './reminders.controller';
import { RemindersService } from './reminders.service';

describe('RemindersController', () => {
  let controller: RemindersController;

  const mockRemindersService = {};
  const mockTokensService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RemindersController],
      providers: [RemindersService, TokensService],
    })
      .overrideProvider(RemindersService)
      .useValue(mockRemindersService)
      .overrideProvider(TokensService)
      .useValue(mockTokensService)
      .compile();

    controller = module.get<RemindersController>(RemindersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
