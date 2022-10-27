import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateReminderDto {
  @ApiProperty({ description: 'A valid token', format: 'uuid', example: '' })
  @IsNotEmpty()
  @IsUUID()
  @IsString()
  token: string;

  @ApiProperty({ description: 'Reminder title', example: 'Title Example' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ description: 'Reminder description', example: 'Description example' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ description: 'Date to remind', format: 'date-time' })
  @IsNotEmpty()
  @IsDateString()
  date: Date;

  @ApiProperty({ description: 'Reminder color', example: '#FFFFFF' })
  @IsNotEmpty()
  @IsString()
  color: string;
}
