import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateTokenDto {
  @ApiPropertyOptional({ description: 'User Name', example: 'John Doe' })
  @IsString()
  @IsOptional()
  name?: string;
}
