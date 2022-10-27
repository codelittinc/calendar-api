import { Test, TestingModule } from '@nestjs/testing';
import { randomUUID } from 'crypto';
import { TokensController } from './tokens.controller';
import { TokensService } from './tokens.service';

describe('TokensController', () => {
  let controller: TokensController;

  const mockTokensService = {
    create: jest.fn(({ name }) => {
      return { id: randomUUID(), name: name, createdAt: new Date(), updatedAt: new Date() };
    }),

    findOne: jest.fn((id) => {
      return { id: id, name: 'John Doe', createdAt: new Date(), updatedAt: new Date() };
    }),

    update: jest.fn((id, dto) => {
      return { id: id, name: dto.name, createdAt: new Date(), updatedAt: new Date() };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TokensController],
      providers: [TokensService],
    })
      .overrideProvider(TokensService)
      .useValue(mockTokensService)
      .compile();

    controller = module.get<TokensController>(TokensController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('should create a token', () => {
    it('with a name', async () => {
      const dto = { name: 'John Doe' };
      expect(await controller.create(dto)).toEqual({
        id: expect.any(String),
        name: dto.name,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });
    });

    it('without a name', async () => {
      expect(await controller.create({})).toEqual({
        id: expect.any(String),
        name: undefined,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });
    });
  });

  it('should get a token', async () => {
    expect(await controller.findOne('1')).toEqual({
      id: '1',
      name: expect.any(String),
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });

  it('should update a user', async () => {
    const dto = { name: 'John Doe' };

    expect(await controller.update('1', dto)).toEqual({
      id: '1',
      name: dto.name,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });
});
