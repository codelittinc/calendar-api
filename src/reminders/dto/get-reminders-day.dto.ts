import { ApiProperty } from '@nestjs/swagger';
import { IsDateString } from 'class-validator';
import { buildExceptionId } from '../../utils/build-exception-id';

export class GetRemindersByDayDto {
  @ApiProperty({
    description: 'Day to get reminders (YYYY-MM-DD)',
    format: 'date',
    example: new Date().toISOString().split('T')[0],
  })
  @IsDateString(null, { message: (validate) => buildExceptionId('reminder', validate.property, 'IsNotDateString') })
  date: string;
}
