import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TokensModule } from '../src/tokens/tokens.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Token } from '../src/tokens/entities/token.entity';

describe('TokenController (e2e)', () => {
  let app: INestApplication;

  const mockTokensRepository = {
    findOneOrFail: jest.fn(),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TokensModule],
    })
      .overrideProvider(getRepositoryToken(Token))
      .useValue(mockTokensRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/tokens (GET)', () => {
    return request(app.getHttpServer()).get('/tokens/1').expect(200);
  });
});
