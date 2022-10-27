import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RemindersModule } from '../src/reminders/reminders.module';
import { Reminder } from '../src/reminders/entities/reminder.entity';
import { Token } from '../src/tokens/entities/token.entity';

describe('ReminderController (e2e)', () => {
  let app: INestApplication;

  const mockRemindersRepository = {
    findOneOrFail: jest.fn(),
  };
  const mockTokensRepository = {};

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [RemindersModule],
    })
      .overrideProvider(getRepositoryToken(Reminder))
      .useValue(mockRemindersRepository)
      .overrideProvider(getRepositoryToken(Token))
      .useValue(mockTokensRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/reminders/1/1 (GET)', () => {
    return request(app.getHttpServer()).get('/reminders/1/1').expect(200);
  });
});
