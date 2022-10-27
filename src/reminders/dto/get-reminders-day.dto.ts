import { ApiProperty } from '@nestjs/swagger';
import { IsDateString } from 'class-validator';

export class GetRemindersByDayDto {
  @ApiProperty({
    description: 'Date to get reminders',
    format: 'date',
    example: new Date().toISOString().split('T')[0],
  })
  @IsDateString()
  date: string;
}
