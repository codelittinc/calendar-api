import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { buildExceptionId } from '../../utils/build-exception-id';

export class CreateReminderDto {
  @ApiProperty({ description: 'A valid token', format: 'uuid', example: '' })
  @IsUUID('4', { message: (validate) => buildExceptionId('reminder', validate.property, 'IsNotUUID') })
  @IsNotEmpty({ message: (validate) => buildExceptionId('reminder', validate.property, 'IsEmpty') })
  @IsString({ message: (validate) => buildExceptionId('reminder', validate.property, 'IsNotString') })
  token: string;

  @ApiProperty({ description: 'Reminder title', example: 'Title Example' })
  @IsNotEmpty({ message: (validate) => buildExceptionId('reminder', validate.property, 'IsEmpty') })
  @IsString({ message: (validate) => buildExceptionId('reminder', validate.property, 'IsNotString') })
  title: string;

  @ApiProperty({ description: 'Reminder description', example: 'Description example' })
  @IsNotEmpty({ message: (validate) => buildExceptionId('reminder', validate.property, 'IsEmpty') })
  @IsString({ message: (validate) => buildExceptionId('reminder', validate.property, 'IsNotString') })
  description: string;

  @ApiProperty({ description: 'Date to remind', format: 'date-time' })
  @IsDateString(null, { message: (validate) => buildExceptionId('reminder', validate.property, 'IsNotDateString') })
  @IsNotEmpty({ message: (validate) => buildExceptionId('reminder', validate.property, 'IsEmpty') })
  date: Date;

  @ApiProperty({ description: 'Reminder color', example: '#FFFFFF' })
  @IsNotEmpty({ message: (validate) => buildExceptionId('reminder', validate.property, 'IsEmpty') })
  @IsString({ message: (validate) => buildExceptionId('reminder', validate.property, 'IsNotString') })
  color: string;
}
