import { Controller, Get, Post, Body, Param, Patch, HttpCode } from '@nestjs/common';
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
    description: 'The token has been created successfully',
    schema: {
      example: {
        id: '21681ba4-7556-4358-9500-e4afe1ce6141',
        name: 'John Doe',
        createdAt: '2022-11-02T15:12:13.242Z',
        updatedAt: '2022-11-02T15:12:13.242Z',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  @Post()
  async create(@Body() createTokenDto: CreateTokenDto) {
    return await this.tokensService.create(createTokenDto);
  }

  @ApiOperation({ summary: 'Get a single token' })
  @ApiResponse({
    status: 200,
    description: 'Returns a single token',
    schema: {
      example: {
        id: '21681ba4-7556-4358-9500-e4afe1ce6141',
        name: 'John Doe',
        createdAt: '2022-11-02T15:12:13.242Z',
        updatedAt: '2022-11-02T15:12:13.242Z',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  @ApiParam({ name: 'id', description: 'A valid ID of a token to get' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.tokensService.findOne(id);
  }

  @HttpCode(204)
  @ApiOperation({ summary: 'Update the data of a token' })
  @ApiResponse({
    status: 204,
    description: 'The token has been updated successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  @ApiParam({ name: 'id', description: 'A valid ID of a token to update' })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTokenDto: UpdateTokenDto) {
    return await this.tokensService.update(id, updateTokenDto);
  }
}
