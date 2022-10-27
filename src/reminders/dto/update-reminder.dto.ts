import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateReminderDto } from './create-reminder.dto';

export class UpdateReminderDto extends PartialType(OmitType(CreateReminderDto, ['token'] as const)) {}
