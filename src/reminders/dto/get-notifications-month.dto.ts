import { ApiProperty } from '@nestjs/swagger';
import { IsDateString } from 'class-validator';

export class GetNotificationsByMonthDto {
  @ApiProperty({
    description: 'Date-month to get notifications of reminders',
    format: 'date',
    example: new Date().toISOString().slice(0, 7),
  })
  @IsDateString()
  date: string;
}
