import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { buildExceptionId } from '../../utils/build-exception-id';

export class CreateTokenDto {
  @ApiPropertyOptional({ description: 'User Name', example: 'John Doe' })
  @IsString({ message: (validate) => buildExceptionId('reminder', validate.property, 'IsNotString') })
  @IsOptional()
  name?: string;
}
