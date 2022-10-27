import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Token } from './entities/token.entity';
import { TokensService } from './tokens.service';

describe('TokensService', () => {
  let service: TokensService;

  const mockTokensRepository = {
    create: jest.fn((dto) => dto),

    save: jest.fn((user) =>
      Promise.resolve({ id: '1', name: user.name, createdAt: new Date(), updatedAt: new Date() }),
    ),

    findOneOrFail: jest.fn(),

    update: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TokensService, { provide: getRepositoryToken(Token), useValue: mockTokensRepository }],
    }).compile();

    service = module.get<TokensService>(TokensService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new token and return it', async () => {
    const dto = { name: 'John Doe' };
    expect(await service.create(dto)).toEqual({
      id: expect.any(String),
      name: dto.name,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });

  describe('when getting a token by id', () => {
    describe('and the id is valid', () => {
      let token: Token;
      beforeEach(() => {
        token = new Token();
        mockTokensRepository.findOneOrFail.mockReturnValue(Promise.resolve(token));
      });

      it('should return the token', async () => {
        const result = await service.findOne('1');
        expect(result).toEqual(token);
      });
    });

    describe('and the id is not valid', () => {
      beforeEach(() => {
        mockTokensRepository.findOneOrFail.mockReturnValue(BadRequestException);
      });
      it('should throw an error', async () => {
        expect(await service.findOne('1')).toThrowError();
      });
    });
  });

  describe('when updating a token', () => {
    let token: Token;

    beforeEach(() => {
      token = new Token();
      mockTokensRepository.findOneOrFail.mockReturnValue(Promise.resolve(token));
    });

    it('should return the updated token', async () => {
      expect(await service.update('1', { name: 'John Doe' })).toEqual(token);
    });
  });
});
