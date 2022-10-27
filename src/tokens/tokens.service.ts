import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTokenDto } from './dto/create-token.dto';
import { UpdateTokenDto } from './dto/update-token.dto';
import { Token } from './entities/token.entity';

@Injectable()
export class TokensService {
  constructor(
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
  ) {}

  async create(createTokenDto: CreateTokenDto) {
    try {
      const newToken = this.tokenRepository.create(createTokenDto);

      return await this.tokenRepository.save(newToken);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: string) {
    try {
      return await this.tokenRepository.findOneOrFail({ where: { id: id } });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(id: string, updateTokenDto: UpdateTokenDto) {
    try {
      await this.tokenRepository.update(id, updateTokenDto);
      return await this.findOne(id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
