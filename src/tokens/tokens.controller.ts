import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { CreateTokenDto } from './dto/create-token.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateTokenDto } from './dto/update-token.dto';

@ApiTags('Tokens')
@Controller('tokens')
export class TokensController {
  constructor(private readonly tokensService: TokensService) {}

  @ApiOperation({ summary: 'Create a token' })
  @ApiResponse({
    status: 201,
    description: 'The token has been successfully created',
  })
  @ApiResponse({
    status: 400,
    description: 'An error has occurred when trying to create a token',
  })
  @Post()
  async create(@Body() createTokenDto: CreateTokenDto) {
    return await this.tokensService.create(createTokenDto);
  }

  @ApiOperation({ summary: 'Get a single token' })
  @ApiResponse({
    status: 200,
    description: 'Returns a single token',
  })
  @ApiParam({ name: 'id', description: 'A valid ID of a token to get' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.tokensService.findOne(id);
  }

  @ApiOperation({ summary: 'Update the data of a token' })
  @ApiResponse({
    status: 200,
    description: 'The token has been updated successfully',
  })
  @ApiParam({ name: 'id', description: 'A valid ID of a token to update' })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTokenDto: UpdateTokenDto) {
    return await this.tokensService.update(id, updateTokenDto);
  }
}
