import { Module } from '@nestjs/common';
import { RemindersService } from './reminders.service';
import { RemindersController } from './reminders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reminder } from './entities/reminder.entity';
import { TokensService } from '../tokens/tokens.service';
import { Token } from '../tokens/entities/token.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reminder, Token])],
  controllers: [RemindersController],
  providers: [RemindersService, TokensService],
})
export class RemindersModule {}
