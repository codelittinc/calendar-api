import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Token } from '../tokens/entities/token.entity';
import { TokensService } from '../tokens/tokens.service';
import { CreateReminderDto } from './dto/create-reminder.dto';
import { GetNotificationsByMonthDto } from './dto/get-notifications-month.dto';
import { GetRemindersByDayDto } from './dto/get-reminders-day.dto';
import { UpdateReminderDto } from './dto/update-reminder.dto';
import { Reminder } from './entities/reminder.entity';
import { RemindersService } from './reminders.service';

describe('RemindersService', () => {
  let service: RemindersService;

  const mockRemindersRepository = {
    create: jest.fn(),
    save: jest.fn(() => Reminder),
    createQueryBuilder: jest.fn().mockImplementation(() => createQueryBuilder),
    find: jest.fn(() => [Reminder]),
    findOneOrFail: jest.fn(() => Reminder),
    update: jest.fn(() => Reminder),
    delete: jest.fn(() => void 1),
  };

  const mockTokensService = {
    findOne: jest.fn(() => Token),
  };

  const createQueryBuilder: any = {
    select: () => createQueryBuilder,
    groupBy: () => createQueryBuilder,
    where: () => createQueryBuilder,
    andWhere: () => createQueryBuilder,
    getRawMany: () => [Object],
  };

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

  it('should create a new Reminder', async () => {
    expect(await service.create(new CreateReminderDto())).toBe(Reminder);
  });

  it('should find reminders notifications by month', async () => {
    expect(await service.findRemindersNotificationsByMonth('1', new GetNotificationsByMonthDto())).toStrictEqual([
      Object,
    ]);
  });

  it('should find reminders by the select day', async () => {
    expect(await service.findRemindersByDay('1', new GetRemindersByDayDto())).toStrictEqual([Reminder]);
  });

  it('should update a reminder', async () => {
    expect(await service.update('1', '2', new UpdateReminderDto())).toBe(Reminder);
  });

  it('should delete a reminder', async () => {
    expect(await service.remove('1', '2')).toBe(void 1);
  });
});
