import { ApiProperty } from '@nestjs/swagger';
import { IsDateString } from 'class-validator';
import { buildExceptionId } from '../../utils/build-exception-id';

export class GetNotificationsByMonthDto {
  @ApiProperty({
    description: 'Month to get notifications of reminders (YYYY-MM)',
    format: 'date',
    example: new Date().toISOString().slice(0, 7),
  })
  @IsDateString(null, { message: (validate) => buildExceptionId('reminder', validate.property, 'IsNotDateString') })
  date: string;
}
