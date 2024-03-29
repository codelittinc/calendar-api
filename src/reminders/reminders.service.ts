import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TokensService } from '../tokens/tokens.service';
import { Between, Repository } from 'typeorm';
import { CreateReminderDto } from './dto/create-reminder.dto';
import { GetNotificationsByMonthDto } from './dto/get-notifications-month.dto';
import { GetRemindersByDayDto } from './dto/get-reminders-day.dto';
import { UpdateReminderDto } from './dto/update-reminder.dto';
import { Reminder } from './entities/reminder.entity';

@Injectable()
export class RemindersService {
  constructor(
    @InjectRepository(Reminder)
    private readonly remindersRepository: Repository<Reminder>,

    private readonly tokensService: TokensService,
  ) {}

  async create(createReminderDto: CreateReminderDto) {
    const { token: tokenId, ...rest } = createReminderDto;

    const token = await this.tokensService.findOne(tokenId);

    try {
      const newReminder = this.remindersRepository.create({ token: token, ...rest });

      return await this.remindersRepository.save(newReminder);
    } catch (error) {
      throw new HttpException(`reminder.${error.name}`, HttpStatus.BAD_REQUEST);
    }
  }

  async findRemindersNotificationsByMonth(token: string, getNotificationsByMonthDto: GetNotificationsByMonthDto) {
    await this.tokensService.findOne(token);

    try {
      const { date } = getNotificationsByMonthDto;

      const selectedMonth = new Date(date);
      const firstDay = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth(), 1);
      const lastDay = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1, 0);
      lastDay.setUTCHours(23, 59, 59, 999);

      return await this.remindersRepository
        .createQueryBuilder('r')
        .select(`DATE_TRUNC('day', r.date) as date`)
        .where('r.date BETWEEN :firstDay AND :lastDay', { firstDay: firstDay, lastDay: lastDay })
        .andWhere('r.token_id = :token', { token })
        .groupBy(`DATE_TRUNC('day', r.date)`)
        .getRawMany();
    } catch (error) {
      throw new HttpException(`reminder.${error.name}`, HttpStatus.BAD_REQUEST);
    }
  }

  async findRemindersByDay(token: string, getRemindersByDayDto: GetRemindersByDayDto) {
    await this.tokensService.findOne(token);

    try {
      const { date } = getRemindersByDayDto;

      const startOfDay = new Date(date);
      startOfDay.setUTCHours(0, 0, 0, 0);
      const endOfDay = new Date(date);
      endOfDay.setUTCHours(23, 59, 59, 999);

      return await this.remindersRepository.find({
        where: { token: { id: token }, date: Between(startOfDay, endOfDay) },
      });
    } catch (error) {
      throw new HttpException(`reminder.${error.name}`, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(token: string, id: string) {
    await this.tokensService.findOne(token);

    try {
      return await this.remindersRepository.findOneOrFail({ where: { id: id, token: { id: token } } });
    } catch (error) {
      throw new HttpException(`reminder.${error.name}`, HttpStatus.BAD_REQUEST);
    }
  }

  async update(token: string, id: string, updateReminderDto: UpdateReminderDto) {
    await this.tokensService.findOne(token);
    await this.findOne(token, id);

    try {
      await this.remindersRepository.update({ id: id, token: { id: token } }, updateReminderDto);
      return await this.findOne(token, id);
    } catch (error) {
      throw new HttpException(`reminder.${error.name}`, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(token: string, id: string) {
    await this.tokensService.findOne(token);
    await this.findOne(token, id);

    try {
      await this.remindersRepository.delete({ id: id, token: { id: token } });
    } catch (error) {
      throw new HttpException(`reminder.${error.name}`, HttpStatus.BAD_REQUEST);
    }
  }
}
