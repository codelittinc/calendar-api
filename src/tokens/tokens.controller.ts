import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { CreateTokenDto } from './dto/create-token.dto';
import { ApiTags } from '@nestjs/swagger';
import { UpdateTokenDto } from './dto/update-token.dto';

@ApiTags('Tokens')
@Controller('tokens')
export class TokensController {
  constructor(private readonly tokensService: TokensService) {}

  @Post()
  async create(@Body() createTokenDto: CreateTokenDto) {
    return await this.tokensService.create(createTokenDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.tokensService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTokenDto: UpdateTokenDto) {
    return await this.tokensService.update(id, updateTokenDto);
  }
}
