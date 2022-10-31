import { Test, TestingModule } from '@nestjs/testing';
import { TokensService } from '../tokens/tokens.service';
import { CreateReminderDto } from './dto/create-reminder.dto';
import { UpdateReminderDto } from './dto/update-reminder.dto';
import { Reminder } from './entities/reminder.entity';
import { RemindersController } from './reminders.controller';
import { RemindersService } from './reminders.service';

describe('RemindersController', () => {
  let controller: RemindersController;

  const mockRemindersService = {
    create: jest.fn(() => Reminder),

    findRemindersNotificationsByMonth: jest.fn(() => [Object]),

    findRemindersByDay: jest.fn(() => [Reminder]),

    findOne: jest.fn(() => Reminder),

    update: jest.fn(() => void 1),

    remove: jest.fn(() => void 1),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RemindersController],
      providers: [RemindersService, TokensService],
    })
      .overrideProvider(RemindersService)
      .useValue(mockRemindersService)
      .overrideProvider(TokensService)
      .useValue({})
      .compile();

    controller = module.get<RemindersController>(RemindersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a token', async () => {
    expect(await controller.create(new CreateReminderDto())).toBe(Reminder);
  });

  it('should return the reminder notifications for each month', async () => {
    expect(
      await controller.findRemindersNotificationsByMonth('1', { date: new Date().toISOString().slice(0, 7) }),
    ).toStrictEqual([Object]);
  });

  it('should return reminders by day', async () => {
    expect(await controller.findRemindersByDay('1', { date: new Date().toISOString().split('T')[0] })).toStrictEqual([
      Reminder,
    ]);
  });

  it('should return a single reminder', async () => {
    expect(await controller.findOne('1', '2')).toBe(Reminder);
  });

  it('should update a reminder', async () => {
    expect(await controller.update('1', '2', new UpdateReminderDto())).toBe(void 1);
  });

  it('should delete a reminder', async () => {
    expect(await controller.remove('1', '2')).toBe(void 1);
  });
});
